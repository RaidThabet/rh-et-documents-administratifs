import axios from "axios";

export const login = async (credentials: { email: string, password: string }) => {
    try {
        const response = await axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/login`,
                credentials,
                {withCredentials: true}
            );

        if (response.statusText !== "OK") {
            throw new Error("Authentication failed");
        }
        const newToken = response.data.token;
        localStorage.setItem("token", newToken);
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
    } catch (e) {
        console.log(e);
        throw new Error("Authentication non successful")
    }
}

export const logout = () => {
    localStorage.removeItem("token");
};