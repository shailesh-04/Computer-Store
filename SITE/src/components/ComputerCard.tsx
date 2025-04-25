import { IComputers } from "@/types/Computer";
import { BiCart } from "react-icons/bi";
import { useCart } from "@/context/CartContext";
export default function ComputerCard({ computer }: { computer: IComputers }) {
    const { addToCart } = useCart();
    return (
        <div className="relative bg-white rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden group">
            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full shadow-md"
                    onClick={() => {
                        addToCart(computer);
                    }}
                >
                    <BiCart size={20} />
                </button>
            </div>

            <img
                src={computer.image}
                alt={computer.model}
                className="w-full h-48 object-cover"
            />

            <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                    {computer.brand} {computer.model}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {computer.processor} • {computer.ram} RAM •{" "}
                    {computer.storage} SSD
                </p>
                <p className="text-sm text-gray-600 mt-1">
                    {computer.graphics_card} • {computer.screen_size}" •{" "}
                    {computer.operating_system}
                </p>

                <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg font-semibold text-blue-600">
                        ₹{computer.price}
                    </span>
                    <span
                        className={`text-sm font-medium ${
                            computer.stock_quantity &&
                            computer.stock_quantity > 0
                                ? "text-green-600"
                                : "text-red-500"
                        }`}
                    >
                        {computer.stock_quantity && computer.stock_quantity > 0
                            ? "In Stock"
                            : "Out of Stock"}
                    </span>
                </div>
            </div>
        </div>
    );
}
