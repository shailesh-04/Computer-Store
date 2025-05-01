import Navbar from "@/components/Navbar";
import { useCart } from "@/context/CartContext";
import { IComputers } from "@/types/Computer";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";
export default function CartPage() {
    const { user } = useUser();
    const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
    const navigate = useNavigate();
    const total = cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );
    function purchesItem(item: IComputers) {
        if (!user) {
            navigate("/login");
            return;
        }
        navigate("/pay",{state:item});
    }
    function purchesCart() {
        if (!user) {
            navigate("/login");
            return;
        }
        navigate("/pay");
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <Navbar />
            <div className="max-w-5xl mx-auto p-6">
                <IoArrowBack
                    size={25}
                    className="mb-1.5 cursor-pointer"
                    onClick={() => navigate(-1)}
                />
                <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
                {cart.length === 0 ? (
                    <p className="text-gray-600">Your cart is empty.</p>
                ) : (
                    <>
                        <div className="space-y-4">
                            {cart.map((item) => (
                                <div
                                    key={item.id}
                                    className="bg-white p-4 rounded shadow flex justify-between items-center gap-10"
                                >
                                    {/* 🖼️ Product Image */}
                                    <div className="w-24 h-24 flex-shrink-0 rounded overflow-hidden border">
                                        <img
                                            src={item.image}
                                            alt={item.model}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className="w-full">
                                        <h2 className="text-lg font-semibold">
                                            {item.brand} {item.model}
                                        </h2>
                                        <p className="text-sm text-gray-600">
                                            ₹{item.price} × {item.quantity}
                                        </p>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <button
                                            className="text-blue-200 bg-blue-700 p-1 rounded cursor-pointer hover:underline"
                                            onClick={() => purchesItem(item)}
                                        >
                                            Perches
                                        </button>
                                        <input
                                            type="number"
                                            min="1"
                                            value={item.quantity}
                                            onChange={(e) =>
                                                updateQuantity(
                                                    item.id!,
                                                    parseInt(e.target.value)
                                                )
                                            }
                                            className="w-16 border px-2 py-1 rounded"
                                        />

                                        <button
                                            className="text-red-500 hover:underline"
                                            onClick={() =>
                                                removeFromCart(item.id!)
                                            }
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-between items-center">
                            <h2 className="text-xl font-semibold">
                                Total: ₹{total}
                            </h2>
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                onClick={purchesCart}
                            >
                                Pureshech Cart
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={clearCart}
                            >
                                Clear Cart
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
