import {HeroUIProvider} from "@heroui/system";
import {Outlet} from "react-router";

function App() {
    return (
        <HeroUIProvider>
            <div className={"flex flex-row justify-center items-center h-[100vh]"}>
                {/*<Sidebar />*/}
                <div className={"flex justify-center items-center flex-1 h-full"}>
                    <Outlet />
                </div>
            </div>
        </HeroUIProvider>
    );
}

export default App;