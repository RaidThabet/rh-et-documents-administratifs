import axios from "axios";
import {LeaveSchema} from "../lib/schema/leaveSchema.ts";

type LeaveBackendSchema = {
    _id: string;
    userId: string;
    leave_type: string;
    leave_start: Date;
    leave_end: Date;
    justification: string;
    request_status: string;
}

export const getAllLeaves = async () => {
    try {
        const response = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/leave`,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Failed to get logs")
        }

        const data = response.data;
        return data.map((leave: LeaveBackendSchema) => ({
            _id: leave._id,
            username: leave.userId,
            type: leave.leave_type,
            start: leave.leave_start,
            end: leave.leave_end,
            justification: leave.justification,
            status: leave.request_status
        }))
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const addLeave = async (newLeave: LeaveSchema) => {
    const data = {
        userId: newLeave.username,
        leave_type: newLeave.type,
        leave_start: new Date(newLeave.start),
        leave_end: new Date(newLeave.end),
        justification: newLeave.justification
    }

    try {
        const response = await axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/leave`,
                data,
                {withCredentials: true}
            );

        if (response.status !== 201) {
            throw new Error("Failed to register leave")
        }

        return {message: "Congé ajouté avec succès"};
    } catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(e.response.data);
    }
}

export const updateLeave = async (newLeave: LeaveSchema) => {
    console.log("leave _id: ", newLeave._id);
    const data = {
        userId: newLeave.username,
        leave_type: newLeave.type,
        leave_start: new Date(newLeave.start),
        leave_end: new Date(newLeave.end),
        justification: newLeave.justification
    }

    try {
        const response = await axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/leave/${newLeave._id}`,
                data,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Failed to update leave");
        }

        return {message: "Congé modifié avec succés"};
    } catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(e.response.data);
    }
}

export const deleteLeave = async (data: { id: string }) => {
    try {
        const response = await axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/leave/${data.id}`,
                {data, withCredentials: true});

        if (response.status !== 200) {
            throw new Error("Failed to delete leave")
        }

        return {message: "Congé supprimé avec succés"};
    } catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(e.response.data);
    }
}