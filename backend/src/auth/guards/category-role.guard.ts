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

export const CATEGORY_ROLES_KEY = 'categoryRoles';
export const RequireCategoryRole = (...roles: Role[]) =>
    SetMetadata(CATEGORY_ROLES_KEY, roles);

@Injectable()
export class CategoryRoleGuard implements CanActivate {
    constructor(
        private reflector: Reflector,
        private db: DatabaseService,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            CATEGORY_ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );

        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const categoryId = request.params.id;

        if (!categoryId) {
            throw new ForbiddenException('Category ID is required');
        }

        // Get category to find projectId
        const category = await this.db.category.findUnique({
            where: { id: categoryId },
            select: { projectId: true },
        });

        if (!category) {
            throw new ForbiddenException('Category not found');
        }

        // Get user's membership in the project
        const membership = await this.db.projectMembership.findUnique({
            where: {
                projectId_userId: {
                    projectId: category.projectId,
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
