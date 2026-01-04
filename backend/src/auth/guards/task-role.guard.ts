import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
    SetMetadata,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { DatabaseService } from '../../database/database.service';

export const TASK_ROLES_KEY = 'taskRoles';
export const RequireTaskRole = (...roles: Role[]) =>
    SetMetadata(TASK_ROLES_KEY, roles);

@Injectable()
export class TaskRoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private db: DatabaseService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            TASK_ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const taskId = request.params.id;

        if (!taskId) {
            throw new ForbiddenException('Task ID is required');
        }

        // Get task to find categoryId, then projectId
        const task = await this.db.task.findUnique({
            where: { id: taskId },
            include: {
                category: {
                    select: { projectId: true },
                },
            },
        });

        if (!task) {
            throw new ForbiddenException('Task not found');
        }

        // Get user's membership in the project
        const membership = await this.db.projectMembership.findUnique({
            where: {
                projectId_userId: {
                    projectId: task.category.projectId,
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

        return true;
    }
}
