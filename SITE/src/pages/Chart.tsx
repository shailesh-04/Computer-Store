import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getComputer } from '@/services/Computer';
import { IComputers } from '@/types/Computer';
import Navbar from '../components/Navbar';

export default function ChartPage() {
  const [products, setProducts] = useState<IComputers[]>([]);

  useEffect(() => {
    getComputer().then(setProducts);
  }, []);

  return (
    <div>
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Product Stock Chart</h1>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={products}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantity" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}