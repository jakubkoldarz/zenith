import { z } from "zod";
import { TaskSchema } from "../../tasks/types/tasksSchemas";

export const CategorySchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "Category name is required"),
    order: z.number().min(0),
    projectId: z.string(),
});

export const CategoryWithTasksSchema = CategorySchema.extend({
    tasks: z.array(TaskSchema),
});

export const CreateCategorySchema = CategorySchema.pick({
    name: true,
    projectId: true,
});

export const UpdateCategorySchema = CategorySchema.pick({
    name: true,
}).partial();

export const ReorderCategorySchema = CategorySchema.pick({
    order: true,
}).array();

export type CategoryDto = z.infer<typeof CategorySchema>;
export type CategoryWithTasksDto = z.infer<typeof CategoryWithTasksSchema>;
export type CreateCategoryDto = z.infer<typeof CreateCategorySchema>;
export type UpdateCategoryDto = z.infer<typeof UpdateCategorySchema>;
export type ReorderCategoryDto = z.infer<typeof ReorderCategorySchema>;
