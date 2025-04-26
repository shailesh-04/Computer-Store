import { Link } from "react-router-dom";
import { FaOpencart } from "react-icons/fa";
import { useUser } from "@/context/UserContext";
import ProfileMenu from "./Profile";
export default function Navbar() {
    const { user} = useUser();
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
                       <ProfileMenu />

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
