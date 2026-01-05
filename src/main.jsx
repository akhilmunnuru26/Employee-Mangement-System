import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";

import AuthProvider from "./context/AuthProvider.jsx";
import EmployeeProvider from "./context/EmployeeProvider.jsx"; 


createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
