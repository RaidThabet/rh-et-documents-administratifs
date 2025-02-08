import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().trim().email({
        message: "Email non valide"
    }),
    password: z.string().trim().min(6, {
        message: "Le mot de passe est au minimum de 6 caractères"
    })
});

export type LoginSchema = z.infer<typeof loginSchema>;