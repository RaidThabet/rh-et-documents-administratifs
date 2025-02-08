import {getAuthToken} from "../util/auth.ts";
import {Navigate, Outlet} from "react-router";

function ProtectedRoutes() {
    const token = getAuthToken();

    if (!token) {
        return <Navigate to={"/login"} />
    }

    return <Outlet />
}

export default ProtectedRoutes;