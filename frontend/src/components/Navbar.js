import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between 
    bg-gradient-to-r from-[#14001f] via-[#240046] to-[#3c096c] 
    shadow-xl border-b border-white/10 sticky top-0 z-50">

      {/* Logo */}
      <h1 className="text-2xl font-semibold tracking-wide text-purple-300">
        PingMe 💬
      </h1>

      {/* Links */}
      <div className="flex items-center gap-3">

        {/* Home */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-sm font-medium no-underline
            border border-purple-400/30
            transition-all duration-300
            ${isActive
              ? "bg-purple-500 text-white"
              : "text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/60"
            }`
          }
        >
          Home
        </NavLink>

        {/* Login */}
        <NavLink
          to="/login"
          className={({ isActive }) =>
            `px-4 py-2 rounded-md text-sm font-medium no-underline
            border border-purple-400/30
            transition-all duration-300
            ${isActive
              ? "bg-purple-500 text-white"
              : "text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/60"
            }`
          }
        >
          Login
        </NavLink>

        {/* Register (Primary CTA) */}
        <NavLink
          to="/register"
         className={({ isActive }) =>
            `px-4 py-2 rounded-md text-sm font-medium no-underline
            border border-purple-400/30
            transition-all duration-300
            ${isActive
              ? "bg-purple-500 text-white"
              : "text-purple-200 hover:bg-purple-500/20 hover:border-purple-400/60"
            }`
          }
        >
          Register
        </NavLink>

      </div>
    </nav>
  );
}

export default Navbar;