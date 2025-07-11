import { useState, useEffect } from "react";
import { IComputers } from "@/types/Computer";

interface Props {
  onSubmit: (data: IComputers) => void;
  initialData?: IComputers | null;
}

export default function ComputerForm({ onSubmit, initialData }: Props) {
  const [computer, setComputer] = useState<IComputers>({
    brand: "",
    model: "",
    processor: "",
    ram: "",
    storage: "",
    graphics_card: "",
    operating_system: "",
    screen_size: "",
    price: 0,
    stock_quantity: 0,
    descrition: "",
    image: "",
  });

  useEffect(() => {
    if (initialData) {
      setComputer({ ...computer, ...initialData });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setComputer({ ...computer, [name]: name === "price" || name === "stock_quantity" ? +value : value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(computer);
    setComputer({
      brand: "",
      model: "",
      processor: "",
      ram: "",
      storage: "",
      graphics_card: "",
      operating_system: "",
      screen_size: "",
      price: 0,
      stock_quantity: 0,
      descrition: "",
      image: "",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 overflow-y-auto max-h-[80vh]">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          "brand",
          "model",
          "processor",
          "ram",
          "storage",
          "graphics_card",
          "operating_system",
          "screen_size",
          "descrition",
          "image",
        ].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            placeholder={field.replace("_", " ")}
            value={(computer as any)[field]}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        ))}
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={computer.price}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          required
        />
        <input
          type="number"
          name="stock_quantity"
          placeholder="Stock Quantity"
          value={computer.stock_quantity}
          onChange={handleChange}
          className="border p-2 w-full rounded"
        />
      </div>
      <div className="text-center">
        <button
          type="submit"
          className="bg-green-600 text-white py-2 px-6 rounded hover:bg-green-700"
        >
          {initialData ? "Update Computer" : "Add Computer"}
        </button>
      </div>
    </form>
  );
}
