import {Routes, Route } from "react-router-dom";
import Login from "@pages/login";
import Cart from "@/pages/Cart";
import Index from "@/pages/Computer";
import NotFound from "@pages/NotFound";
import UserPage from "@/pages/admin/UserPage";
import SignIn from "@/pages/Sigin";
import EditProfile from "@/pages/EditProfile";
import ComputerPage from "@/pages/admin/ComputerPage";
import Pay from "@/pages/Pay";
export default function AppRouter() {
    return (
        <Routes>
            {/* index route */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pay" element={<Pay />} />

            {/* admin route */}
            <Route path="/admin/users" element={<UserPage />} />
            <Route path="/admin/computers" element={<ComputerPage />} />

            {/* user route */}
            <Route path="/user/edit" element={<EditProfile/>} />

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
