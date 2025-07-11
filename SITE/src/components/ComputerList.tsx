// src/components/ComputerList.tsx
import { IComputers } from "@/types/Computer";

interface Props {
  computers: IComputers[];
  onEdit: (computer: IComputers) => void;
  onDelete: (id: string) => void;
}

export default function ComputerList({ computers, onEdit, onDelete }: Props) {
  return (
    <div className="grid gap-4">
      {computers.map((computer) => (
        <div key={computer.id} className="border p-4 rounded shadow">
          <h2 className="text-lg font-semibold">
            {computer.brand} {computer.model}
          </h2>
          <p className="text-gray-700">Processor: {computer.processor}</p>
          <p className="text-gray-700">RAM: {computer.ram}</p>
          <p className="text-gray-700">Storage: {computer.storage}</p>
          <p className="text-gray-700">Graphics: {computer.graphics_card}</p>
          <p className="text-gray-700">OS: {computer.operating_system}</p>
          <p className="text-gray-700">Screen: {computer.screen_size}</p>
          <p className="text-gray-700">Stock: {computer.stock_quantity}</p>
          <p className="text-gray-700">Price: ${computer.price}</p>
          <p className="text-gray-700">Description: {computer.descrition}</p>
          {computer.image && (
            <img src={computer.image} alt={computer.model} className="w-32 mt-2" />
          )}
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => onEdit(computer)}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => computer.id && onDelete(computer.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
