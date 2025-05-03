import Navbar from "@/components/Navbar";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "@/context/CartContext";
import { useUser } from "@/context/UserContext";
import { IComputers } from "@/types/Computer";
import { IoArrowBack } from "react-icons/io5";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { order } from "@/services/Order";

export default function PaymentPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { cart, clearCart, removeFromCart } = useCart();
    const { user } = useUser();
    const item: IComputers | undefined = location.state;
    const [paymentMethod, setPaymentMethod] = useState("cod");
    const [showSuccess, setShowSuccess] = useState(false);
    const products = item ? [item] : cart;

    const total = products.reduce((sum, p) => sum + p.price * p.quantity, 0);
    async function handlePayment() {
        const itemIds = products.map((val) => val.id).join(",");
        const quantity = products.map((val) => val.quantity).join(",");
        if (!user) {
            navigate("/login");
            return;
        }
        try {
            const result = await order({
                user_id: user.id,
                computer_id: itemIds,
                quantity: quantity,
                total_price: total,
            });
            console.log(result)
            setShowSuccess(true);
            setTimeout(() => {
                item ? removeFromCart(item.id) : clearCart();
                navigate("/");
            }, 2500);
        } catch (error: any) {
            alert(error.data.message);
        }
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6">
                <div className="flex items-center gap-2 mb-4">
                    <IoArrowBack
                        size={25}
                        className="cursor-pointer"
                        onClick={() => navigate(-1)}
                    />
                    <h1 className="text-2xl font-bold">Payment</h1>
                </div>

                <div className="bg-white p-6 rounded shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Order Summary
                    </h2>
                    <ul className="space-y-4">
                        {products.map((p) => (
                            <li key={p.id} className="flex justify-between">
                                <span>
                                    {p.brand} {p.model} (x{p.quantity})
                                </span>
                                <span>₹{p.price * p.quantity}</span>
                            </li>
                        ))}
                    </ul>
                    <div className="mt-4 text-right font-semibold text-lg">
                        Total: ₹{total}
                    </div>
                </div>

                <div className="bg-white p-6 rounded shadow mb-6">
                    <h2 className="text-xl font-semibold mb-4">
                        Choose Payment Method
                    </h2>
                    <div className="space-y-3">
                        {["card", "upi", "netbanking", "cod"].map((method) => (
                            <label key={method} className="block capitalize">
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method}
                                    checked={paymentMethod === method}
                                    onChange={(e) =>
                                        setPaymentMethod(e.target.value)
                                    }
                                    className="mr-2"
                                />
                                {method === "cod"
                                    ? "Cash on Delivery"
                                    : method.toUpperCase()}
                            </label>
                        ))}
                    </div>
                </div>

                <button
                    onClick={handlePayment}
                    className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 w-full"
                >
                    Pay ₹{total}
                </button>
            </div>

            {/* ✅ Animated Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
                    >
                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                            }}
                            className="bg-white p-10 rounded-lg shadow-xl text-center max-w-sm"
                        >
                            <div className="text-green-500 text-4xl mb-4">
                                ✔️
                            </div>
                            <h2 className="text-2xl font-bold mb-2">
                                Payment Successful
                            </h2>
                            <p className="text-gray-600 mb-4">
                                Thank you for your order!
                            </p>
                            <p className="text-sm text-gray-400">
                                Redirecting to home...
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
