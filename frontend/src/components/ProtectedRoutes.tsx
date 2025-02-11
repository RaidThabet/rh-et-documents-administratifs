import {Navigate, Outlet} from "react-router";
import {useAuthStore} from "../store/useAuthStore.ts";

function ProtectedRoutes() {
    const isAuthenticated = useAuthStore(state => state.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to={"/login"} />
    }

    return <Outlet />
}

export default ProtectedRoutes;