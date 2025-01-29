import {HeroUIProvider} from "@heroui/system";
import Sidebar from "./components/Sidebar.tsx";
import {Outlet} from "react-router";

function App() {
    return (
        <HeroUIProvider>
            <div className={"flex flex-row justify-start items-center"}>
                <Sidebar />
                <div className={"flex-1"}>
                    <Outlet />
                </div>
            </div>
        </HeroUIProvider>

    );
}

export default App;