import PageBreadcrumbs from "./PageBreadcrumbs.tsx";
import {User} from "@heroui/user";

function Header() {
    return (
        <div className={"px-6 pt-3 flex flex-row justify-between items-center w-full"}>
            <PageBreadcrumbs />
            <User name={"Lazher Hamel"} />
        </div>
    );
}

export default Header;