import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-[#202c33] text-white shadow-md">
      
      <h1 className="text-xl font-semibold">PingMe 💬</h1>

      <div className="space-x-3">
        <Link to="/" className="px-4 py-2 rounded hover:bg-gray-700">
          Home
        </Link>

        <Link to="/login" className="px-4 py-2 rounded border border-gray-400 hover:bg-gray-700">
          Login
        </Link>

        <Link to="/register" className="px-4 py-2 rounded bg-[#00a884] hover:bg-[#019875]">
          Register
        </Link>

        <Link to="/chat" className="px-4 py-2 rounded bg-green-600 hover:bg-green-700">
          Chat
        </Link>
      </div>
    </div>
  );
}

export default Navbar;