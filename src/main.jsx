import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "modern-normalize";
import "./index.css";
import "@fontsource/roboto"; // Default weight 400
import "animate.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
