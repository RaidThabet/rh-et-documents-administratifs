import {getAuthToken} from "../util/auth.ts";
import {Navigate, Outlet} from "react-router";

function ProtectedRoutes() {
    const token = getAuthToken();

    if (!token) {
        return <Navigate to={"/login"} />
    }

    console.log("token: " + token);

    return <Outlet />
}

export default ProtectedRoutes;