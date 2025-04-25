import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@pages/login";
import Cart from "@/pages/Cart";
import Computer from "@pages/Computer";
import NotFound from "@pages/NotFound";
export default function AppRouter() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route path="/" element={<Computer />} />
                <Route path="/login" element={<Login />} />
                <Route path="/chart" element={<Cart />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
