import {Navigate, Outlet} from "react-router";
import {getAuthToken} from "../util/auth.ts";

function ProtectedRoutes() {
    const token = getAuthToken();

    if (!token) {
        console.log("not authenticated");
        return <Navigate to={"/login"} />
    }

    return <Outlet />
}

export default ProtectedRoutes;