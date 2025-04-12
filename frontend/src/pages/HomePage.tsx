import { motion } from "framer-motion";
import {Link} from "react-router";
import {useAuth} from "../hooks/useAuth.ts";
import {useEffect, useState} from "react";

function HomePage() {
    const {isLoggedIn} = useAuth();

    const [nextPageHref, setNextPageHref] = useState(isLoggedIn ? "/accueil" : "/login");

    useEffect(() => {
        setNextPageHref(() => {
            return isLoggedIn ? "/accueil" : "login";
        })
    }, [isLoggedIn]);

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-indigo-600 to-blue-600">
            <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-xl flex flex-col items-center gap-8">
                <motion.img
                    layoutId="logo-isimm"
                    className="h-40 object-contain"
                    src="/public/images/logo_isimm.png"
                    alt="Logo ISIMM"
                />

                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
                    RH & Documents Administratifs
                </h1>

                <p className="text-center text-gray-500 text-sm md:text-base">
                    Simplifiez la gestion RH et accédez rapidement à vos documents.
                </p>

                <Link
                    to={nextPageHref}
                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300"
                >
                    Démarrer
                </Link>
            </div>
        </div>
    );
}

export default HomePage;
