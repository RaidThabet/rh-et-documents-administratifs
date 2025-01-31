import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter, Route, Routes} from "react-router";
import LoginPage from "./components/LoginPage.tsx";
import ManagementPage from "./components/ManagementPage.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
          <BrowserRouter>
              <Routes>
                  <Route path={"/"} element={<App />}>
                      <Route path={"login"} element={<LoginPage />} />
                      <Route path={"/users-management"} element={
                          <ManagementPage
                              title={"Gestion des Utilisateurs"}
                              subtitle={"Gérer les utilisateurs et leurs rôles ici."}
                          />
                      }
                      />
                  </Route>
              </Routes>
          </BrowserRouter>
  </StrictMode>,
)
