import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";

import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2000,
          style: {
            background: "#4BB543",
            color: "#fff",
            fontSize: "14px",
            padding: "10px 20px",
            borderRadius: "5px",
          },
        }}
      />

      <App />
    </>
  </StrictMode>
);