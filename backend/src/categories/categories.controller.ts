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
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ReorderCategoryDto } from './dto/reorder-category.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import {
    CategoryRoleGuard,
    RequireCategoryRole,
} from '../auth/guards/category-role.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('api/categories')
@UseGuards(JwtAuthGuard)
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post()
    create(
        @CurrentUser() user: any,
        @Body() createCategoryDto: CreateCategoryDto,
    ) {
        return this.categoriesService.create(user.userId, createCategoryDto);
    }

    @Get()
    findAll(@CurrentUser() user: any, @Query('projectId') projectId?: string) {
        return this.categoriesService.findAll(user.userId, projectId);
    }

    @Get(':id')
    @UseGuards(CategoryRoleGuard)
    @RequireCategoryRole(Role.VIEWER)
    findOne(@CurrentUser() user: any, @Param('id') id: string) {
        return this.categoriesService.findOne(user.userId, id);
    }

    @Patch(':id')
    @UseGuards(CategoryRoleGuard)
    @RequireCategoryRole(Role.EDITOR)
    update(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() updateCategoryDto: UpdateCategoryDto,
    ) {
        return this.categoriesService.update(
            user.userId,
            id,
            updateCategoryDto,
        );
    }

    @Patch(':id/reorder')
    @UseGuards(CategoryRoleGuard)
    @RequireCategoryRole(Role.EDITOR)
    reorder(
        @CurrentUser() user: any,
        @Param('id') id: string,
        @Body() reorderCategoryDto: ReorderCategoryDto,
    ) {
        return this.categoriesService.reorder(
            user.userId,
            id,
            reorderCategoryDto,
        );
    }

    @Delete(':id')
    @UseGuards(CategoryRoleGuard)
    @RequireCategoryRole(Role.EDITOR)
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@CurrentUser() user: any, @Param('id') id: string) {
        return this.categoriesService.remove(user.userId, id);
    }
}
