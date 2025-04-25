import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import { logout as logoutService } from "@/services/Auth";
import { IoIosLogOut } from "react-icons/io";
export default function Navbar() {
    const { user, logout } = useUser();
    const logoutUser = async () => {
        try {
            const sucess = await logoutService();
            logout();
            alert(sucess.message);
        } catch (error: any) {
            alert(error.message);
        }
    };
    return (
        <nav className="bg-gray-900 text-white px-6 py-4 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo / Title */}
                <Link
                    to="/"
                    className="text-2xl font-bold tracking-wide text-blue-400"
                >
                    Radhe <span className="text-white">Computers</span>
                </Link>

                {/* Nav Links */}
                <div className="space-x-6 text-sm font-medium flex items-center">
                    <Link
                        to="/cart"
                        className="flex items-center gap-2 hover:text-blue-400 transition-colors duration-200"
                    >
                        <FaOpencart size={25} />
                    </Link>
                    {user ? (
                        <div className="flex items-center gap-4">
                            {user.image && (
                                <img
                                    src={user.image}
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            )}
                            <div>
                                <p className="font-semibold">{user.name}</p>
                                <p className="text-sm text-gray-500">
                                    {user.email}
                                </p>
                            </div>
                            <button onClick={logoutUser}>
                                <IoIosLogOut />
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="hover:text-red-400 transition-colors duration-200"
                            >
                                Login
                            </Link>
                            <Link
                                to="/signin"
                                className="hover:text-red-400 transition-colors duration-200"
                            >
                                Signin
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
