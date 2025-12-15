import api from "../../../api";
import {
    CategoryDto,
    CategoryWithTasksDto,
    CreateCategoryDto,
    ReorderCategoryDto,
    UpdateCategoryDto,
} from "../types/categoriesSchemas";

const getCategoriesByProjectId = async (projectId: string): Promise<CategoryDto[]> => {
    const response = await api.get<CategoryDto[]>(`/categories?projectId=${projectId}`);
    return response.data;
};

const getCategoryDetails = async (categoryId: string): Promise<CategoryWithTasksDto> => {
    const response = await api.get<CategoryWithTasksDto>(`/categories/${categoryId}`);
    return response.data;
};

const createCategory = async (data: CreateCategoryDto): Promise<CategoryDto> => {
    const response = await api.post<CategoryDto>("/categories", data);
    return response.data;
};

const deleteCategory = async (categoryId: string): Promise<void> => {
    await api.delete<void>(`/categories/${categoryId}`);
};

const updateCategory = async (categoryId: string, data: UpdateCategoryDto): Promise<CategoryDto> => {
    const response = await api.patch<CategoryDto>(`/categories/${categoryId}`, data);
    return response.data;
};

const reorderCategory = async (categoryId: string, data: ReorderCategoryDto): Promise<void> => {
    await api.patch<void>(`/categories/${categoryId}/reorder`, data);
};

export const categoriesApi = {
    getAll: getCategoriesByProjectId,
    getOne: getCategoryDetails,
    create: createCategory,
    delete: deleteCategory,
    update: updateCategory,
    reorder: reorderCategory,
};
