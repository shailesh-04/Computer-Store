import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { CartProvider } from "@context/CartContext.tsx";
import { UserProvider } from "./context/UserContext.tsx";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <CartProvider>
                <UserProvider>
                    <App />
                </UserProvider>
            </CartProvider>
        </BrowserRouter>
    </StrictMode>
);
