import PageBreadcrumbs from "./PageBreadcrumbs.tsx";
import {User} from "@heroui/user";

function Header() {
    const username = localStorage.getItem("username");

    return (
        <div className={"px-6 pt-3 flex flex-row justify-between items-center w-full"}>
            <PageBreadcrumbs />
            <User name={username ? username : "User"} />
        </div>
    );
}

export default Header;