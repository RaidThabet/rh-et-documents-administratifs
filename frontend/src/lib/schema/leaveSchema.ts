import {z} from "zod";

export const leaveSchema = z.object({
    username: z.string().trim().min(1, {message: "User ID cannot be blank"}),
    type: z.string().trim().min(1, {message: "Invalid leave type"}),
    start: z.string(),
    end: z.string(),
    justification: z.string().trim().min(1, {message: "Invalid justification"}),
    status: z.string().trim().min(1, {message: "Invalid status"}) // (small typo in your comment btw)
}).refine(data => {
    const startDate = new Date(data.start);
    const endDate = new Date(data.end);
    return startDate < endDate;
}, {
    message: "La date de début doit être avant la date de fin",
    path: ["end"]
});


export type LeaveSchema = z.infer<typeof leaveSchema>;