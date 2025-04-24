import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ComputerCard from '@/components/ComputerCard';
import { getComputer } from '@/services/Computer';
import { IComputers } from '@/types/Computer';

export default function Computer() {
  const [products, setProducts] = useState<IComputers[]>([]);
  useEffect(() => {
    getComputer().then(setProducts);
  }, []);
  return (
    <div>
      <Navbar />
      <div className="p-4 grid grid-cols-2 gap-4">
        {products.map((product) => (
          <ComputerCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
