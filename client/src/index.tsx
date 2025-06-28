import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";

import { AuthContextProvider } from "./context/Auth";
import { AlertsContextProvider } from "./context/Alerts";
import { ProjectsContextProvider } from "./context/Projects";
import { ProjectContextProvider } from "./context/Project";
import { SkillsContextProvider } from "./context/Skills";
import { ThemeContextProvider } from "./context/Theme";

import "./index.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <ThemeContextProvider>
          <ProjectsContextProvider>
            <ProjectContextProvider>
              <SkillsContextProvider>
                <AlertsContextProvider>
                  <App />
                </AlertsContextProvider>
              </SkillsContextProvider>
            </ProjectContextProvider>
          </ProjectsContextProvider>
        </ThemeContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
