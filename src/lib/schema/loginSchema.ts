import {z} from "zod";

export const loginSchema = z.object({
    email: z.string().email({
        message: "Email n'est pas valide"
    }),
    password: z.string().min(6, {
        message: "Le mot de passe est au minimum de 6 caractères"
    })
});

export type LoginSchema = z.infer<typeof loginSchema>;