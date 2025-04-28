export type Leave = {
    _id?: string;
    username: string;
    type: string;
    start: string;
    end: string;
    justification: string; // only show when looking on details
    status: string;
}