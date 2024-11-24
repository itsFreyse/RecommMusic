import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// App
import App from "./App.jsx";
// Context
import AppProviders from "./assets/context/AppProviders.jsx";
// Estilos
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProviders>
      <App />
    </AppProviders>
  </StrictMode>
);
