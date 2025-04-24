import React, { JSX, useState } from "react";
import { login } from "@/services/User";
export default function Login(): JSX.Element {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const success = await login({ email, password });
            alert(success.message   );
        } catch (error) {
            
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
            </form>
        </div>
    );
}
