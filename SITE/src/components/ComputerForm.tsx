// src/components/ComputerForm.tsx
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
    price: 0,
  });

  useEffect(() => {
    if (initialData) {
      setComputer(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComputer({ ...computer, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(computer);
    setComputer({ brand: "", model: "", price: 0 });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        name="brand"
        placeholder="Brand"
        value={computer.brand}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="text"
        name="model"
        placeholder="Model"
        value={computer.model}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Price"
        value={computer.price}
        onChange={handleChange}
        className="border p-2 w-full"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
      >
        {initialData ? "Update Computer" : "Add Computer"}
      </button>
    </form>
  );
}
