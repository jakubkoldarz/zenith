import { z } from "zod";

export const TaskSchema = z.object({
    id: z.uuid(),
    title: z.string().min(1, "Task title is required"),
    description: z.string().optional().nullable(),
    isCompleted: z.boolean().default(false),
    order: z.number().min(0),
    categoryId: z.string(),
});

export const CreateTaskSchema = TaskSchema.pick({
    title: true,
    description: true,
    categoryId: true,
});

export const UpdateTaskSchema = TaskSchema.pick({
    title: true,
    description: true,
    isCompleted: true,
}).partial();

export const MoveTaskSchema = z.object({
    categoryId: z.string(),
    order: z.number().min(0),
});

export type TaskDto = z.infer<typeof TaskSchema>;
export type CreateTaskDto = z.infer<typeof CreateTaskSchema>;
export type UpdateTaskDto = z.infer<typeof UpdateTaskSchema>;
export type MoveTaskDto = z.infer<typeof MoveTaskSchema>;
