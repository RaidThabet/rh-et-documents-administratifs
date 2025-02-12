import { Navigate, Outlet } from "react-router";
import { useAuth } from "../hooks/useAuth.ts";

function ProtectedRoutes() {
    const { isLoggedIn, loading } = useAuth();

    if (loading) {
        return <div className={"text-4xl flex justify-center items-center h-[100vh]"}>Chargement...</div>; // Or your loading component
    }

    if (!isLoggedIn) {
        console.log("not authenticated");
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}

export default ProtectedRoutes;