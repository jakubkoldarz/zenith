import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { DatabaseService } from '../database/database.service';
import { Role } from '@prisma/client';

@Injectable()
export class TasksService {
    constructor(private readonly db: DatabaseService) {}

    private async checkProjectAccessViaCategory(
        userId: string,
        categoryId: string,
        minRole: Role = Role.VIEWER,
    ) {
        const category = await this.db.category.findUnique({
            where: { id: categoryId },
        });

        if (!category) {
            throw new NotFoundException(
                `Category with ID ${categoryId} not found`,
            );
        }

        const membership = await this.db.projectMembership.findUnique({
            where: {
                projectId_userId: {
                    projectId: category.projectId,
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

        return { membership, category };
    }

    async create(userId: string, createTaskDto: CreateTaskDto) {
        // Check if user has EDITOR or OWNER role
        await this.checkProjectAccessViaCategory(
            userId,
            createTaskDto.categoryId,
            Role.EDITOR,
        );

        // Get the highest order number for this category
        const highestOrder = await this.db.task.findFirst({
            where: { categoryId: createTaskDto.categoryId },
            orderBy: { order: 'desc' },
            select: { order: true },
        });

        const order = highestOrder ? highestOrder.order + 1 : 0;

        return this.db.task.create({
            data: {
                title: createTaskDto.title,
                description: createTaskDto.description,
                categoryId: createTaskDto.categoryId,
                order,
            },
        });
    }

    async findAll(userId: string, categoryId?: string) {
        if (categoryId) {
            // Check if user has access to this project via category
            await this.checkProjectAccessViaCategory(
                userId,
                categoryId,
                Role.VIEWER,
            );

            return this.db.task.findMany({
                where: { categoryId },
                orderBy: { order: 'asc' },
            });
        }

        // If no categoryId, return tasks from all projects user has access to
        const memberships = await this.db.projectMembership.findMany({
            where: { userId },
            select: { projectId: true },
        });

        const projectIds = memberships.map((m) => m.projectId);

        return this.db.task.findMany({
            where: {
                category: {
                    projectId: { in: projectIds },
                },
            },
            orderBy: { order: 'asc' },
        });
    }

    async findOne(userId: string, id: string) {
        const task = await this.db.task.findUnique({
            where: { id },
            include: {
                category: true,
            },
        });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        // Check if user has access to the project
        await this.checkProjectAccessViaCategory(
            userId,
            task.categoryId,
            Role.VIEWER,
        );

        return task;
    }

    async update(userId: string, id: string, updateTaskDto: UpdateTaskDto) {
        const task = await this.db.task.findUnique({ where: { id } });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        // Check if user has EDITOR or OWNER role
        await this.checkProjectAccessViaCategory(
            userId,
            task.categoryId,
            Role.EDITOR,
        );

        return this.db.task.update({
            where: { id },
            data: updateTaskDto,
        });
    }

    async move(userId: string, id: string, moveTaskDto: MoveTaskDto) {
        const task = await this.db.task.findUnique({ where: { id } });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        // Check if user has EDITOR or OWNER role in both source and target categories
        await this.checkProjectAccessViaCategory(
            userId,
            task.categoryId,
            Role.EDITOR,
        );
        await this.checkProjectAccessViaCategory(
            userId,
            moveTaskDto.categoryId,
            Role.EDITOR,
        );

        return this.db.task.update({
            where: { id },
            data: {
                categoryId: moveTaskDto.categoryId,
                order: moveTaskDto.order,
            },
        });
    }

    async remove(userId: string, id: string) {
        const task = await this.db.task.findUnique({ where: { id } });

        if (!task) {
            throw new NotFoundException(`Task with ID ${id} not found`);
        }

        // Check if user has EDITOR or OWNER role
        await this.checkProjectAccessViaCategory(
            userId,
            task.categoryId,
            Role.EDITOR,
        );

        await this.db.task.delete({ where: { id } });
    }
}
