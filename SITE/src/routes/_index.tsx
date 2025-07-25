import {Routes, Route } from "react-router-dom";
import Login from "@pages/login";
import Cart from "@/pages/Cart";
import Computers from "@/pages/Computer";
import NotFound from "@pages/NotFound";
import SignIn from "@/pages/Sigin";
import Pay from "@/pages/Pay";
import Admin from "./admin";
import Users from "./users";
export default function AppRouter() {
    return (
        <Routes>
            {/* index route */}
            <Route path="/" element={<Computers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<Pay />} />
            {/* admin route */}
            <Route path="/admin/*" element={<Admin />} />
            {/* user route */}
            <Route path="/user/*" element={<Users />} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
