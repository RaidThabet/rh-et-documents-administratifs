import {HeroUIProvider} from "@heroui/system";
import {Outlet} from "react-router";
import Sidebar from "./components/Sidebar.tsx";
import Header from "./components/Header.tsx";

function App() {
    return (
        <HeroUIProvider>
            <div className={"flex flex-row justify-center items-center h-[100vh]"}>
                <Sidebar/>
                <div className={"overflow-scroll flex flex-col justify-start items-start flex-1 h-full"}>
                    <Header />
                    <Outlet/>
                </div>
            </div>
        </HeroUIProvider>
    );
}

export default App;