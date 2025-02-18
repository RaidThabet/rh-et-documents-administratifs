import axios from "axios";

export const getAllLogs = async () => {
    try {
        const response = await axios
            .get(`${import.meta.env.VITE_BACKEND_URL}/log`,
                {withCredentials: true}
            );

        if (response.status !== 200) {
            throw new Error("Failed to get logs")
        }

        return response.data;
    } catch (e) {
        console.log(e);
        throw e;
    }

}