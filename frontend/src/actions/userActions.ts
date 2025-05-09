import axios from "axios";
import {UserAddSchema} from "../lib/schema/userAddSchema.ts";
import {forgotPassword} from "./authActions.ts";

export const addUser = async (data: UserAddSchema) => {
    try {
        const response = await axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/register`,
                data,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Failed to register user")
        }

        // When a new user is created, he will be asked to create his own password through a link that is sent to his email.
        // We can re-use the forgotPassword action to do so.
        await forgotPassword({email: data.email});

        return {message: "Utilisateur ajouté avec succès"};
    } catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(e.response.data);
    }
}

export const updateUser = async (data: UserAddSchema) => {
    try {
        const response = await axios
            .put(`${import.meta.env.VITE_BACKEND_URL}/auth`,
                data,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Failed to update user");
        }

        return {message: "Utilisateur modifié avec succés"};
    } catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(e.response.data);
    }
}

export const deleteUser = async (data: { email: string }) => {
    try {
        const response = await axios
            .delete(`${import.meta.env.VITE_BACKEND_URL}/auth`,
                {data, withCredentials: true});

        if (response.status !== 200) {
            throw new Error("Failed to delete user")
        }

        return {message: "Utilisateur supprimé avec succés"};
    } catch (e) {
        console.log(e);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        throw new Error(e.response.data);
    }
}

export const getAllUsers = async () => {
    try {
        const response = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/auth/users`,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Failed to fetch users");
        }

        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const getEmployeesAndAgents = async () => {
    try {
        const response = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/auth/users`,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Failed to fetch users");
        }

        return response.data.filter((e: { role: string; }) => e.role === "agent" || e.role === "professor");
    } catch (e) {
        console.log(e);
        throw e;
    }
}