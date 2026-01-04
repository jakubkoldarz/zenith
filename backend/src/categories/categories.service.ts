import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReorderCategoryDto } from './dto/reorder-category.dto';
import { DatabaseService } from '../database/database.service';
import { Role } from '@prisma/client';

@Injectable()
export class CategoriesService {
    constructor(private readonly db: DatabaseService) {}

    private async checkProjectAccess(
        userId: string,
        projectId: string,
        minRole: Role = Role.VIEWER,
    ) {
        const membership = await this.db.projectMembership.findUnique({
            where: {
                projectId_userId: {
                    projectId,
                    userId,
                },
            },
        });

        if (!membership) {
            throw new ForbiddenException(
                'You do not have access to this project',
            );
        }

        const roleHierarchy = {
            [Role.VIEWER]: 0,
            [Role.EDITOR]: 1,
            [Role.OWNER]: 2,
        };

        if (roleHierarchy[membership.role] < roleHierarchy[minRole]) {
            throw new ForbiddenException(
                `You need at least ${minRole} role to perform this action`,
            );
        }

        return membership;
    }

    async create(userId: string, createCategoryDto: CreateCategoryDto) {
        // Check if user has EDITOR or OWNER role
        await this.checkProjectAccess(
            userId,
            createCategoryDto.projectId,
            Role.EDITOR,
        );

        // Get the highest order number for this project
        const highestOrder = await this.db.category.findFirst({
            where: { projectId: createCategoryDto.projectId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const order = highestOrder ? highestOrder.order + 1 : 0;

        return this.db.category.create({
            data: {
                name: createCategoryDto.name,
                projectId: createCategoryDto.projectId,
                order,
            },
        });
    }

    async findAll(userId: string, projectId?: string) {
        if (projectId) {
            // Check if user has access to this project
            await this.checkProjectAccess(userId, projectId, Role.VIEWER);

            return this.db.category.findMany({
                where: { projectId },
                orderBy: { order: 'asc' },
                include: {
                    tasks: {
                        orderBy: { order: 'asc' },
                    },
                },
            });
        }

        // If no projectId, return categories from all projects user has access to
        const memberships = await this.db.projectMembership.findMany({
            where: { userId },
            select: { projectId: true },
        });

        const projectIds = memberships.map((m) => m.projectId);

        return this.db.category.findMany({
            where: {
                projectId: { in: projectIds },
            },
            orderBy: { order: 'asc' },
            include: {
                tasks: {
                    orderBy: { order: 'asc' },
                },
            },
        });
    }

    async findOne(userId: string, id: string) {
        const category = await this.db.category.findUnique({
            where: { id },
            include: {
                tasks: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        // Check if user has access to the project
        await this.checkProjectAccess(userId, category.projectId, Role.VIEWER);

        return category;
    }

    async update(
        userId: string,
        id: string,
        updateCategoryDto: UpdateCategoryDto,
    ) {
        const category = await this.db.category.findUnique({ where: { id } });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        // Check if user has EDITOR or OWNER role
        await this.checkProjectAccess(userId, category.projectId, Role.EDITOR);

        return this.db.category.update({
            where: { id },
            data: updateCategoryDto,
        });
    }

    async reorder(
        userId: string,
        id: string,
        reorderCategoryDto: ReorderCategoryDto,
    ) {
        const category = await this.db.category.findUnique({ where: { id } });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        // Check if user has EDITOR or OWNER role
        await this.checkProjectAccess(userId, category.projectId, Role.EDITOR);

        return this.db.category.update({
            where: { id },
            data: { order: reorderCategoryDto.order },
        });
    }

    async remove(userId: string, id: string) {
        const category = await this.db.category.findUnique({ where: { id } });

        if (!category) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        // Check if user has EDITOR or OWNER role
        await this.checkProjectAccess(userId, category.projectId, Role.EDITOR);

        await this.db.category.delete({ where: { id } });
    }
}
