import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { _editProfile } from "@/services/User";
const EditProfile: React.FC = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        image: "",
    });
    const [message, setMessage] = useState<string>("");
    const { user } = useUser();
    const navigate = useNavigate();
    useEffect(() => {
        if (user)
            setFormData({
                name: user?.name,
                password: user.password,
                email: user.email,
                image: user?.image||"",
            });
    }, [user?.id]);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            let id = user?.id ? user.id : "";
            const res = await _editProfile(id, formData);
            setMessage(res.message || "");
        } catch (error: any) {
            setMessage(
                error.response?.data?.message || "Something went wrong."
            );
        }
    };
    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded shadow-md mt-10">
            <IoArrowBack
                size={25}
                className="mb-1.5 cursor-pointer"
                onClick={() => navigate(-1)}
            />
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
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
                    className="w-full bg-blue-600 cursor-pointer text-white py-2 rounded hover:bg-blue-700"
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

export default EditProfile;
