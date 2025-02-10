import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import UsersManagementPage from "./pages/UsersManagementPage.tsx";
import EmployeesProfsManagementPage from "./pages/EmployeesProfsManagementPage.tsx";
import ProtectedRoutes from "./components/ProtectedRoutes.tsx";
import PasswordResetPage from "./pages/PasswordResetPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/"} element={<ProtectedRoutes/>}>
                    <Route path={"/accueil"} element={<App/>}>
                        <Route path={"users-management"} element={<UsersManagementPage/>}/>
                        <Route path={"employees-profs-management"} element={<EmployeesProfsManagementPage/>}/>
                    </Route>
                </Route>

                <Route path={"/login"} element={<LoginPage />}/>
                <Route path={"/reset"} element={<PasswordResetPage />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)