import {HeroUIProvider} from "@heroui/system";
import {Navigate, Outlet} from "react-router";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Header from "./components/Header.tsx";
import {useAuth} from "./hooks/useAuth.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
    const {isLoggedIn, loading} = useAuth();

    if (loading) {
        return <div className={"text-4xl flex justify-center items-center h-[100vh]"}>Chargement...</div>; // Or your loading component
    }

    if (!isLoggedIn) {
        console.log("not authenticated");
        return <Navigate to="/login"/>;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <HeroUIProvider>
                <div className={"flex flex-row justify-center items-center h-[100vh]"}>
                    <Sidebar/>
                    <div className={"overflow-scroll flex flex-col justify-start items-start flex-1 h-full"}>
                        <Header/>
                        <Outlet/>
                    </div>
                </div>
            </HeroUIProvider>
        </QueryClientProvider>

    );
}

export default App;