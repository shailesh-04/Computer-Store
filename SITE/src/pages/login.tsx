import React, { JSX, useState } from "react";
import { login as loginService } from "@/services/Auth";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
export default function Login(): JSX.Element {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const {login } = useUser();
    const navigate = useNavigate();
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const success = await loginService({ email, password });
            login(success.data);
            localStorage.setItem("accessToken",success.accessToken);
            if (success) navigate("/");
        } catch (error: any) {
            setMessage(error.data.message);
        }
    };
    return (
        <div className="h-screen flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow w-80"
            >
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full mb-3 p-2 border rounded"
                />
                <button className="w-full bg-blue-600 text-white py-2 rounded">
                    Login
                </button>
                <p className="mt-5 text-center text-red-400">{message}</p>
            </form>
        </div>
    );
}
