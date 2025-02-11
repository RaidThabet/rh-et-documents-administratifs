import axios from "axios";
import {useAuthStore} from "../store/useAuthStore.ts";

export const login = async (credentials: { email: string, password: string }) => {
    try {
        const response = await axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                credentials,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Authentication failed");
        }

        useAuthStore.getState().setIsAuthenticated(true);
    } catch (e) {
        console.log(e);
        throw new Error("Authentication non successful")
    }
}

export const logout = async () => {
    await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`);
    useAuthStore.getState().setIsAuthenticated(false);
};