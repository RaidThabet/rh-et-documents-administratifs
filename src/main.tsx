import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import LoginPage from "./components/LoginPage.tsx";
import UsersManagementPage from "./pages/UsersManagementPage.tsx";
import EmployeesProfsManagementPage from "./pages/EmployeesProfsManagementPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <BrowserRouter>
              <Routes>
                  <Route path={"/accueil"} element={<App />}>
                      <Route path={"users-management"} element={<UsersManagementPage />}/>
                      <Route path={"employees-profs-management"} element={<EmployeesProfsManagementPage />}/>
                  </Route>
                  <Route path={"/login"} element={<LoginPage />} />
              </Routes>
          </BrowserRouter>
  </StrictMode>,
)