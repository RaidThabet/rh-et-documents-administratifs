import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import UsersManagementPage from "./pages/UsersManagementPage.tsx";
import EmployeesProfsManagementPage from "./pages/EmployeesProfsManagementPage.tsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import PasswordResetPage from "./pages/PasswordResetPage.tsx";
import HomePage from "./pages/HomePage.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path={"/accueil"} element={<App/>}>
                    <Route path={"users-management"} element={<UsersManagementPage/>}/>
                    <Route path={"employees-profs-management"} element={<EmployeesProfsManagementPage/>}/>
                </Route>
                <Route path={"/"} element={<HomePage />} />
                <Route path={"/login"} element={<LoginPage/>}/>
                <Route path={"/reset"} element={<ForgotPasswordPage/>}/>
                <Route path={"/password-reset"} element={<PasswordResetPage/>}/>
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)