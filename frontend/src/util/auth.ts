import axios from "axios";

export const getAuthToken = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        return null;
    }
    return token;
}

export const checkResetParams = async (token: string, id: string) => {
    try {
        const response = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot/check?token=${token}&userId=${id}`,
            );

        const data = response.data;

        if (data.isCorrect) {
            return {isCorrect: true};
        }

        return data;
    } catch (e) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        console.log(e.response.data);
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        return {isCorrect: e.response.data.isCorrect};
    }

}

export const checkIsLoggedIn = async () => {
    try {
        const response = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/auth/status`,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Error checking user authentication status");
        }

        return response.data.loggedIn;


    } catch (e) {
        console.log(e);
        return false;
    }
}