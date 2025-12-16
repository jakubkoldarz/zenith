import { z } from "zod";

export const UserSchema = z.object({
    id: z.uuid(),
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.email(),
});

export const UserWithRoleSchema = UserSchema.extend({
    role: z.string(),
});

export const SearchUserQuery = z.object({
    query: z.string().min(1, "Search query is required"),
});

export type UserDto = z.infer<typeof UserSchema>;
export type SearchUserDto = z.infer<typeof SearchUserQuery>;
export type UserWithRoleDto = z.infer<typeof UserWithRoleSchema>;
