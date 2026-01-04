import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { ROLES_KEY } from '../decorators/require-project-role.decorator';
import { DatabaseService } from '../../database/database.service';

@Injectable()
export class ProjectRoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private db: DatabaseService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const projectId = request.params.id;

        if (!projectId) {
            throw new ForbiddenException('Project ID is required');
        }

        // Get user's membership
        const membership = await this.db.projectMembership.findUnique({
            where: {
                projectId_userId: {
                    projectId,
                    userId: user.userId,
                },
            },
        });

        if (!membership) {
            throw new ForbiddenException(
                'You do not have access to this project',
            );
        }

        // Check if user has required role
        // Role hierarchy: OWNER > EDITOR > VIEWER
        const roleHierarchy = {
            [Role.OWNER]: 3,
            [Role.EDITOR]: 2,
            [Role.VIEWER]: 1,
        };

        const userRoleLevel = roleHierarchy[membership.role];
        const minRequiredLevel = Math.min(
            ...requiredRoles.map((role) => roleHierarchy[role]),
        );

        if (userRoleLevel < minRequiredLevel) {
            throw new ForbiddenException(
                'You do not have permission to perform this action',
            );
        }

        // Attach membership to request for later use
        request.projectMembership = membership;

        return true;
    }
}
