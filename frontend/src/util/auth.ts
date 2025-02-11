import axios from "axios";

export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    return token;
}

export const checkResetParams = async (token: string, id: string) => {
    const response = await axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot/check?token=${token}&userId=${id}`,
        );

    const data = response.data;

    if (data.isCorrect) {
        return {isCorrect: true};
    }

    return data;
}