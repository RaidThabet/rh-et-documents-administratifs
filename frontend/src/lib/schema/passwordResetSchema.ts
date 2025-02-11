import {z} from "zod";

export const passwordResetSchema = z.object({
    newPassword: z.string().min(6, {message: "Le nouveau mot de passe doit être au minimum de 6 caractères"}),
    confirmPassword: z.string()
}).refine(data => data.newPassword === data.confirmPassword, {
    message: "Les mots de passe ne sont pas égaux",
    path: ["confirmPassword"]
})

export type PasswordResetSchema = z.infer<typeof passwordResetSchema>