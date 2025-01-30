import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import UsersManagementPage from "./pages/UsersManagementPage.tsx";
import LoginPage from "./components/LoginPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<App />}>
                      <Route path={"login"} element={<LoginPage />} />
                      <Route path={"/users-management"} element={<UsersManagementPage />} />
                  </Route>
              </Routes>
          </BrowserRouter>
  </StrictMode>,
)
