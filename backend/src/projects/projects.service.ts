import {
    Injectable,
    NotFoundException,
    ForbiddenException,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignProjectRoleDto } from './dto/assign-project-role.dto';
import { RevokeAccessDto } from './dto/revoke-access.dto';
import { DatabaseService } from '../database/database.service';
import { Role } from '@prisma/client';
import { convertRoleToFrontend } from './utils/role-converter';

@Injectable()
export class ProjectsService {
    constructor(private readonly db: DatabaseService) {}

    async create(createProjectDto: CreateProjectDto, userId: string) {
        // Create project and assign creator as OWNER
        const project = await this.db.project.create({
            data: {
                name: createProjectDto.name,
                memberships: {
                    create: {
                        userId,
                        role: Role.OWNER,
                    },
                },
            },
        });

        return {
            ...project,
            role: convertRoleToFrontend(Role.OWNER),
        };
    }

    async findAll(userId: string) {
        const memberships = await this.db.projectMembership.findMany({
            where: { userId },
            include: {
                project: true,
            },
        });

        return memberships.map((membership) => ({
            ...membership.project,
            role: convertRoleToFrontend(membership.role),
        }));
    }

    async findOne(id: string, userId: string) {
        const membership = await this.db.projectMembership.findUnique({
            where: {
                projectId_userId: {
                    projectId: id,
                    userId,
                },
            },
        });

        if (!membership) {
            throw new ForbiddenException(
                'You do not have access to this project',
            );
        }

        const project = await this.db.project.findUnique({
            where: { id },
            include: {
                categories: {
                    orderBy: { order: 'asc' },
                    include: {
                        tasks: {
                            orderBy: { order: 'asc' },
                        },
                    },
                },
            },
        });

        if (!project) {
            throw new NotFoundException(`Project with ID ${id} not found`);
        }

        return {
            ...project,
            role: convertRoleToFrontend(membership.role),
        };
    }

    async update(
        id: string,
        updateProjectDto: UpdateProjectDto,
        userId: string,
    ) {
        // Guard already checked permissions, just get membership for role
        const membership = await this.db.projectMembership.findUnique({
            where: {
                projectId_userId: {
                    projectId: id,
                    userId,
                },
            },
        });

        if (!membership) {
            throw new ForbiddenException(
                'You do not have access to this project',
            );
        }

        const project = await this.db.project.update({
            where: { id },
            data: updateProjectDto,
        });

        return {
            ...project,
            role: convertRoleToFrontend(membership.role),
        };
    }

    async remove(id: string, userId: string) {
        // Guard already checked OWNER permission
        await this.db.project.delete({ where: { id } });
    }

    async assignRole(
        projectId: string,
        assignProjectRoleDto: AssignProjectRoleDto,
        currentUserId: string,
    ) {
        // Guard already checked OWNER permission
        // Check if user exists
        const user = await this.db.user.findUnique({
            where: { id: assignProjectRoleDto.userId },
        });

        if (!user) {
            throw new NotFoundException('User not found');
        }

        // Upsert membership
        await this.db.projectMembership.upsert({
            where: {
                projectId_userId: {
                    projectId,
                    userId: assignProjectRoleDto.userId,
                },
            },
            create: {
                projectId,
                userId: assignProjectRoleDto.userId,
                role: assignProjectRoleDto.role,
            },
            update: {
                role: assignProjectRoleDto.role,
            },
        });
    }

    async revokeAccess(
        projectId: string,
        revokeAccessDto: RevokeAccessDto,
        currentUserId: string,
    ) {
        // Guard already checked OWNER permission
        // Cannot revoke own access
        if (revokeAccessDto.userId === currentUserId) {
            throw new ForbiddenException('Cannot revoke your own access');
        }

        await this.db.projectMembership.delete({
            where: {
                projectId_userId: {
                    projectId,
                    userId: revokeAccessDto.userId,
                },
            },
        });
    }

    async getMembers(projectId: string, currentUserId: string) {
        // Guard already checked VIEWER permission
        const memberships = await this.db.projectMembership.findMany({
            where: { projectId },
            include: {
                user: {
                    select: {
                        id: true,
                        email: true,
                        firstname: true,
                        lastname: true,
                    },
                },
            },
        });

        return memberships.map((membership) => ({
            ...membership.user,
            role: convertRoleToFrontend(membership.role),
        }));
    }
}
