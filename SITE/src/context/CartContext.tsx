import {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import { IComputers } from "@/types/Computer";

interface CartItem extends IComputers {
    quantity: number;
}
interface CartContextType {
    cart: CartItem[];
    addToCart: (item: IComputers) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    getItem: (id: string) => CartItem | null;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within CartProvider");
    return context;
};
const LOCAL_STORAGE_KEY = "radhe-computer-cart";
export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [cart, setCart] = useState<CartItem[]>(() => {
        const storedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
        return storedCart ? JSON.parse(storedCart) : [];
    });
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cart));
    }, [cart]);
    const addToCart = (item: IComputers) => {
        setCart((prev) => {
            const exists = prev.find((p) => p.id === item.id);
            if (exists) {
                return prev.map((p) =>
                    p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prev, { ...item, quantity: 1 }];
            }
        });
    };
    const removeFromCart = (id: string) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };
    const getItem = (id: string)=> {
        const item = cart.find((val) => val.id == id);
        return item?item:null;
    };

    const updateQuantity = (id: string, quantity: number) => {
        setCart((prev) =>
            prev.map((item) =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, quantity) }
                    : item
            )
        );
    };
    const clearCart = () => setCart([]);
    return (
        <CartContext.Provider
            value={{
                cart,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getItem,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};
