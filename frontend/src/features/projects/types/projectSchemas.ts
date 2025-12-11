import { z } from "zod";
import { ProjectRole } from "../../../types/projectRoles";
import { CategoryWithTasksSchema } from "../../categories/types/categoriesSchemas";

export const ProjectSchema = z.object({
    id: z.uuid(),
    name: z.string().min(1, "Project name is required"),
    role: z.enum(Object.values(ProjectRole)),
});

export const ProjectWithCategoriesSchema = ProjectSchema.extend({
    categories: z.array(CategoryWithTasksSchema),
});

export const CreateProjectSchema = ProjectSchema.pick({
    name: true,
});
export const UpdateProjectSchema = ProjectSchema.pick({
    name: true,
});
export const AssignProjectRoleSchema = z.object({
    role: z.enum(Object.values(ProjectRole)),
    userId: z.string(),
});

export type ProjectDto = z.infer<typeof ProjectSchema>;
export type ProjectWithCategoriesDto = z.infer<typeof ProjectWithCategoriesSchema>;
export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
