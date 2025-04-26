// src/components/Navbar.tsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between">
      <div className="font-bold text-lg">My Dashboard</div>
      <div className="flex gap-4">
        <Link to="/admin/users" className="hover:underline">Users</Link>
        <Link to="/admin/computers" className="hover:underline">Computers</Link>
      </div>
    </nav>
  );
}
