import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    HttpCode,
    HttpStatus,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { MoveTaskDto } from './dto/move-task.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { TaskRoleGuard, RequireTaskRole } from '../auth/guards/task-role.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('api/tasks')
@UseGuards(JwtAuthGuard)
export class TasksController {
    constructor(private readonly tasksService: TasksService) {}

    @Post()
    create(@CurrentUser() user: any, @Body() createTaskDto: CreateTaskDto) {
        return this.tasksService.create(user.userId, createTaskDto);
    }

    @Get()
    findAll(
        @CurrentUser() user: any,
        @Query('categoryId') categoryId?: string,
    ) {
        return this.tasksService.findAll(user.userId, categoryId);
    }

    @Patch(':id')
    @UseGuards(TaskRoleGuard)
    @RequireTaskRole(Role.EDITOR)
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateTaskDto: UpdateTaskDto,
    ) {
        return this.tasksService.update(user.userId, id, updateTaskDto);
    }

    @Patch(':id/move')
    @UseGuards(TaskRoleGuard)
    @RequireTaskRole(Role.EDITOR)
    move(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() moveTaskDto: MoveTaskDto,
    ) {
        return this.tasksService.move(user.userId, id, moveTaskDto);
    }

    @Delete(':id')
    @UseGuards(TaskRoleGuard)
    @RequireTaskRole(Role.EDITOR)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.tasksService.remove(user.userId, id);
    }
}
