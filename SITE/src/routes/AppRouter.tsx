import {Routes, Route } from "react-router-dom";
import Login from "@pages/login";
import Cart from "@/pages/Cart";
import Computer from "@pages/Computer";
import NotFound from "@pages/NotFound";
import Index from "@/pages/admin";
import SignIn from "@/pages/Sigin";
export default function AppRouter() {
    return (
        <Routes>
            <Route path="/" element={<Computer />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/admin" element={<Index />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
