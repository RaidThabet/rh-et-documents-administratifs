import {z} from "zod";

export const passwordResetSchema = z.object({
    email: z.string().email({message: "Email non valide"})
});

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>