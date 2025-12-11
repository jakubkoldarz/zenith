import { z } from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const registerSchema = z.object({
    firstname: z.string().min(2, "First name must be at least 2 characters long"),
    lastname: z.string().min(2, "Last name must be at least 2 characters long").or(z.literal("")).optional(),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const AuthSchema = z.object({
    token: z.string(),
});

export type LoginDto = z.infer<typeof loginSchema>;
export type RegisterDto = z.infer<typeof registerSchema>;
export type AuthResponseDto = z.infer<typeof AuthSchema>;
