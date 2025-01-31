import {HeroUIProvider} from "@heroui/system";
import {Outlet} from "react-router";
import Sidebar from "./components/Sidebar.tsx";
import {BreadcrumbItem, Breadcrumbs} from "@heroui/breadcrumbs";

function App() {
    return (
        <HeroUIProvider>
            <div className={"flex flex-row justify-center items-center h-[100vh]"}>
                <Sidebar/>
                <div className={"mx-3 flex flex-col justify-start items-start flex-1 h-full"}>
                    <Breadcrumbs
                        size={"lg"}
                        className={"py-2"}
                    >
                        <BreadcrumbItem isCurrent={true}>Accueil</BreadcrumbItem>
                        <BreadcrumbItem isCurrent={true}>Gestion des Utilisateurs</BreadcrumbItem>
                    </Breadcrumbs>
                    <Outlet/>
                </div>
            </div>
        </HeroUIProvider>
    );
}

export default App;