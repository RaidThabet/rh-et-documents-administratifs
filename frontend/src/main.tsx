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
import SystemSettingsPage from "./pages/SystemSettingsPage.tsx";
import AdministrativeDocumentsPage from "./pages/AdministrativeDocumentsPage.tsx";
import LeavesAbsencesPage from "./pages/LeavesAbsencesPage.tsx";
import TimetablesPage from "./pages/TimetablesPage.tsx";
import StatsReportsPage from "./pages/StatsReportsPage.tsx";
import TasksResponsibilitiesPage from "./pages/TasksResponsibilitiesPage.tsx";
import {AnimatePresence} from "framer-motion";
import {HeroUIProvider} from "@heroui/system";
import {ToastProvider} from "@heroui/toast";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AnimatePresence mode="wait">
                <HeroUIProvider>
                    <ToastProvider />
                    <Routes>
                        <Route path={"/accueil"} element={<App/>}>
                            <Route path={"users-management"} element={<UsersManagementPage/>}/>
                            <Route path={"employees-profs-management"} element={<EmployeesProfsManagementPage/>}/>
                            <Route path={"system-settings"} element={<SystemSettingsPage/>}/>
                            <Route path={"documents"} element={<AdministrativeDocumentsPage/>}/>
                            <Route path={"absences-and-leaves"} element={<LeavesAbsencesPage/>}/>
                            <Route path={"timetables"} element={<TimetablesPage/>}/>
                            <Route path={"tasks-and-responsibilities"} element={<TasksResponsibilitiesPage/>}/>
                            <Route path={"stats-and-reports"} element={<StatsReportsPage/>}/>
                        </Route>
                        <Route path={"/"} element={<HomePage/>}/>
                        <Route path={"/login"} element={<LoginPage/>}/>
                        <Route path={"/reset"} element={<ForgotPasswordPage/>}/>
                        <Route path={"/password-reset"} element={<PasswordResetPage/>}/>
                    </Routes>
                </HeroUIProvider>
            </AnimatePresence>
        </BrowserRouter>
    </StrictMode>,
)