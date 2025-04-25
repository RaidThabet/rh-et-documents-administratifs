import {z} from "zod";

export const leaveSchema = z.object({
    userId: z.string().trim().min(1, {message: "User ID cannot be blank"}),
    type: z.string().trim().min(1, {message: "Invalid leave type"}),
    start: z.date(),
    end: z.date(),
    justification: z.string().trim().min(1, {message: "Invalid justification"}),
    status: z.string().trim().min(1, {message: "Invalid justification"}) // TODO: to be removed?
}).refine(data => data.start < data.end, {
    message: "The start date must be before the end date",
    path: ["end"]
});

export type LeaveSchema = z.infer<typeof leaveSchema>;