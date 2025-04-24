import { IComputers } from "@/types/Computer";

export default function ComputerCard({ product }: { product: IComputers }) {
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="text-lg font-semibold">{product.brand}</h2>
      <p>Price: ${product.price}</p>
      <p>Quantity: {product.stock_quantity}</p>
    </div>
  );
}