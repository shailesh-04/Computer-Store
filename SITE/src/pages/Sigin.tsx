import React, { useState } from "react";
import { signin } from "@/services/Auth";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
const SignIn: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
    });
    const [message, setMessage] = useState("");
    const {login} = useUser();
    const navigate = useNavigate();
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signin(formData);
            login(res.data);
            localStorage.setItem("accessToken",res.accessToken);
            setMessage(res.message);
            navigate("/");

        } catch (error: any) {
            setMessage(
                error.response?.data?.message || "Something went wrong."
            );
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
            <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                >
                    Sign Up
                </button>
                {message && (
                    <p className="text-center text-red-500 mt-2">{message}</p>
                )}
            </form>
        </div>
    );
};

export default SignIn;
