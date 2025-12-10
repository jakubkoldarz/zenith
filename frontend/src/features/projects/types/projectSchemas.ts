import { z } from "zod";
import { ProjectRole } from "../../../types/projectRoles";

export const ProjectSchema = z.object({
    id: z.string(),
    name: z.string().min(1, "Project name is required"),
    role: z.enum(Object.values(ProjectRole)),
});

export const CreateProjectSchema = ProjectSchema.omit({ id: true, role: true });
export const UpdateProjectSchema = ProjectSchema.omit({ id: true, role: true }).partial();

export type ProjectDto = z.infer<typeof ProjectSchema>;
export type CreateProjectDto = z.infer<typeof CreateProjectSchema>;
export type UpdateProjectDto = z.infer<typeof UpdateProjectSchema>;
