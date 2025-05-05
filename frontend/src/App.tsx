import {Navigate, Outlet} from "react-router";
import Sidebar from "./components/sidebar/Sidebar.tsx";
import Header from "./components/Header.tsx";
import {useAuth} from "./hooks/useAuth.ts";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function App() {
    const {isLoggedIn, loading} = useAuth();

    return (
        <QueryClientProvider client={queryClient}>
                <div className="flex flex-row justify-center items-center h-[100vh]">
                    <Sidebar />

                    <div className="overflow-scroll flex flex-col justify-start items-start flex-1 h-full">
                        {loading ? (
                            <div className="flex justify-center items-center h-full w-full text-2xl">
                                Chargement...
                            </div>
                        ) : !isLoggedIn ? (
                            <Navigate to="/login" replace />
                        ) : (
                            <>
                                <Header />
                                <Outlet />
                            </>
                        )}
                    </div>
                </div>
        </QueryClientProvider>
    );
}


export default App;