import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ComputerCard from '@/components/ComputerCard';
import { getComputer } from '@/services/Computer';
import { IComputers } from '@/types/Computer';

export default function ComputerPage() {
  const [computers, setComputers] = useState<IComputers[]>([]);

  useEffect(() => {
    getComputer().then(setComputers);
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <Navbar />
      <div className="p-6">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Explore Computers</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {computers.map((computer) => (
            <ComputerCard key={computer.id} computer={computer} />
          ))}
        </div>
      </div>
    </div>
  );
}
