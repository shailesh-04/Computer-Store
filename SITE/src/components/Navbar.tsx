import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="font-bold text-lg">Radhe Computer</div>
      <div className="space-x-4">
        <Link to="/computer">computer</Link>
        <Link to="/chart">Chart</Link>
        <Link to="/">Logout</Link>
      </div>
    </nav>
  );
}
