export type Task = {
    _id?: string;
    responableId: string;
    deadline: Date;
    description: string;
    taskStatus: "enCours" | "termine";
}