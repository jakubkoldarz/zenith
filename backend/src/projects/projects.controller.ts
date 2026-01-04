import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Put,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AssignProjectRoleDto } from './dto/assign-project-role.dto';
import { RevokeAccessDto } from './dto/revoke-access.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ProjectRoleGuard } from '../auth/guards/project-role.guard';
import { RequireProjectRole } from '../auth/decorators/require-project-role.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('api/projects')
@UseGuards(JwtAuthGuard)
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) {}

    @Post()
    create(
        @Body() createProjectDto: CreateProjectDto,
        @CurrentUser() user: any,
    ) {
        return this.projectsService.create(createProjectDto, user.userId);
    }

    @Get()
    findAll(@CurrentUser() user: any) {
        return this.projectsService.findAll(user.userId);
    }

    @Get(':id')
    @UseGuards(ProjectRoleGuard)
    @RequireProjectRole(Role.VIEWER)
    findOne(@Param('id') id: string, @CurrentUser() user: any) {
        return this.projectsService.findOne(id, user.userId);
    }

    @Patch(':id')
    @UseGuards(ProjectRoleGuard)
    @RequireProjectRole(Role.EDITOR)
    update(
        @Param('id') id: string,
        @Body() updateProjectDto: UpdateProjectDto,
        @CurrentUser() user: any,
    ) {
        return this.projectsService.update(id, updateProjectDto, user.userId);
    }

    @Delete(':id')
    @UseGuards(ProjectRoleGuard)
    @RequireProjectRole(Role.OWNER)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Param('id') id: string, @CurrentUser() user: any) {
        return this.projectsService.remove(id, user.userId);
    }

    @Put(':id/assign')
    @UseGuards(ProjectRoleGuard)
    @RequireProjectRole(Role.OWNER)
    @HttpCode(HttpStatus.NO_CONTENT)
    assignRole(
        @Param('id') id: string,
        @Body() assignProjectRoleDto: AssignProjectRoleDto,
        @CurrentUser() user: any,
    ) {
        return this.projectsService.assignRole(
            id,
            assignProjectRoleDto,
            user.userId,
        );
    }

    @Put(':id/revoke')
    @UseGuards(ProjectRoleGuard)
    @RequireProjectRole(Role.OWNER)
    @HttpCode(HttpStatus.NO_CONTENT)
    revokeAccess(
        @Param('id') id: string,
        @Body() revokeAccessDto: RevokeAccessDto,
        @CurrentUser() user: any,
    ) {
        return this.projectsService.revokeAccess(
            id,
            revokeAccessDto,
            user.userId,
        );
    }

    @Get(':id/members')
    @UseGuards(ProjectRoleGuard)
    @RequireProjectRole(Role.VIEWER)
    getMembers(@Param('id') id: string, @CurrentUser() user: any) {
        return this.projectsService.getMembers(id, user.userId);
    }
}
