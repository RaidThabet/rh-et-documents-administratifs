export type Leave = {
    username: string;
    type: string;
    start: string;
    end: string;
    justification: string; // only show when looking on details
    status: "Pending" | "Accepted" | "Rejected";
}