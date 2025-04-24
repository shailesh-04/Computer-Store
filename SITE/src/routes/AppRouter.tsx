import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "@pages/login";
import Chart from "@pages/Chart";
import Computer from "@pages/Computer";
export default function AppRouter() {
    return (
        <BrowserRouter
            future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        >
            <Routes>
                <Route path="/" element={<Login/>} />
                <Route path="/chart" element={<Chart/>} />
                <Route path="/computer" element={<Computer/>} />
            </Routes>
        </BrowserRouter>
    );
}
