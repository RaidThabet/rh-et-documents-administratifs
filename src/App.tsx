import {HeroUIProvider} from "@heroui/system";
import {Outlet} from "react-router";
import Sidebar from "./components/Sidebar.tsx";
import PageBreadcrumbs from "./components/PageBreadcrumbs.tsx";
import {Divider} from "@heroui/divider";

function App() {

    return (
        <HeroUIProvider>
            <div className={"relative flex flex-row justify-center items-center h-[100vh]"}>
                <Sidebar/>
                <div className={"ml-28 mr-5 flex flex-col justify-start items-start flex-1 h-full"}>
                    <PageBreadcrumbs />
                    <Divider />
                    <Outlet/>
                </div>
            </div>
        </HeroUIProvider>
    );
}

export default App;