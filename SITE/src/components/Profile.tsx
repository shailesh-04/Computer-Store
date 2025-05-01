import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout as logoutService } from "@/services/Auth";
import { useUser } from "@/context/UserContext";
import { IoIosLogOut } from "react-icons/io";

export default function ProfileMenu() {
    const { user, logout } = useUser();
    const [showMenu, setShowMenu] = useState(false);
    const navigate = useNavigate();

    const logoutUser = async () => {
        try {
            let flag = confirm("Do you want to sign out?");
            console.log(flag);
            if (flag) {
                await logoutService();
                logout();
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    return (
        <div
            className="relative"
            onMouseEnter={() => setShowMenu(true)}
            onMouseLeave={() => setShowMenu(false)}
        >
            <img
                src={user?.image}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover cursor-pointer"
            />
            {showMenu && (
                <div className="absolute top-9 right-0 w-64 bg-white text-black shadow-lg rounded-lg p-4 z-50">
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={user?.image}
                            alt="Profile"
                            className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                            <p className="font-semibold">{user?.name}</p>
                            <p className="text-sm text-gray-500">
                                {user?.email}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate("/user/edit")}
                        className="w-full bg-blue-500 cursor-pointer text-white py-1.5 rounded hover:bg-blue-600 mb-2"
                    >
                        Edit Profile
                    </button>
                    <button
                        onClick={logoutUser}
                        className="w-full flex items-center cursor-pointer justify-center gap-2 bg-red-500 text-white py-1.5 rounded hover:bg-red-600"
                    >
                        <IoIosLogOut size={18} />
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
