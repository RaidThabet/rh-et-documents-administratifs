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
                setIsLoggedIn(false);
            } finally {
                setLoading(false);
            }
        };
        checkLogin();
    }, []);

    return { isLoggedIn, setIsLoggedIn, loading };
};