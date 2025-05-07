import axios from "axios";

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

        const newToken = response.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;

        const user = response.data.user;

        localStorage.setItem("username", user.username);
        localStorage.setItem("userId", user._id);
        localStorage.setItem("userRole", user.role);
    } catch (e) {
        console.log(e);
        throw new Error("Authentication non successful")
    }
}

export const logout = async () => {
    try {
        await axios.get(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
            withCredentials: true
        });
        delete axios.defaults.headers.common["Authorization"];
        localStorage.setItem("logout", Date.now().toString());
        localStorage.removeItem("username");
        localStorage.removeItem("userId");
    } catch (e) {
        console.log(e);
    }
};

export const forgotPassword = async (data: { email: string }) => {
    try {
        const response = await axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/forgot`,
                data
            );

        if (response.status === 404) {
            throw new Error(response.data.message);
        }

    } catch (e) {
        console.log(e);
        throw e;
    }
}

export const resetPassword = async (data: { token: string, userId: string, password: string }) => {
    try {
        const response = await axios
            .post(`${import.meta.env.VITE_BACKEND_URL}/auth/reset`,
                data
            );

        if (response.status === 404) {
            throw new Error(response.data.message);
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}