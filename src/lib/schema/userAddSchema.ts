import {z} from "zod";

export const userAddSchema = z.object({
    lastName: z.string().trim().min(1, {message: "Veuillez spécifier le nom"}),
    firstName: z.string().trim().min(1, {message: "Veuillez spécifier le prénom"}),
    gender: z.string().trim().min(1, {message: "Veuillez spécifier le genre"}),
    address: z.string().trim().email({message: "Email non valide"}),
    grade: z.string().trim().min(1, {message: "Veuillez spécifier le grade"}),
    department: z.string().trim().min(1, {message: "Veuillez spécifier le departement"}),
    seniority: z.string().trim().min(1, {message: "Veuillez spécifier l'ancienneté"}),
});

export type UserAddSchema = z.infer<typeof userAddSchema>