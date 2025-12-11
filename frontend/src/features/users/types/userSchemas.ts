import { z } from "zod";

const User = z.object({
    id: z.uuid(),
    firstname: z.string(),
    lastname: z.string().optional(),
    email: z.email(),
});

export type UserDto = z.infer<typeof User>;
