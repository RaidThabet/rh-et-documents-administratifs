import { useEffect, useState } from 'react';
import { checkIsLoggedIn } from "../util/auth.ts";

export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkLogin = async () => {
            try {
                const loggedIn = await checkIsLoggedIn();
                setIsLoggedIn(loggedIn);
            } catch (error) {
                console.log(error);
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "logout") {
                setIsLoggedIn(false);
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    return { isLoggedIn, setIsLoggedIn, loading };
};