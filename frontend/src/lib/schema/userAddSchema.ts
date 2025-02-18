import {z} from "zod";

export const userAddSchema = z.object({
    username: z.string().trim().min(1, {message: "Veuillez spécifier le nom et le prénom"}),
    gender: z.string().trim().min(1, {message: "Veuillez spécifier le genre"}),
    email: z.string().trim().email({message: "Email non valide"}),
    grade: z.string().trim().min(1, {message: "Veuillez spécifier le grade"}),
    role: z.string().trim().min(1, {message: "Veuillez spécifier le role"}),
    department: z.string().trim().min(1, {message: "Veuillez spécifier le departement"}),
    seniority: z.string().trim().min(1, {message: "Veuillez spécifier l'ancienneté"}),
});

export type UserAddSchema = z.infer<typeof userAddSchema>