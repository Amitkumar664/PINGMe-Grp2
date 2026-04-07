import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // Adding loading and error states for better UX
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // 2. Initialize the hook

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevents page reload on form submit
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log("Success:", res.data);
      
      // 3. Redirect the user to the chat page immediately
      navigate("/chat");

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#14001f] via-[#240046] to-[#3c096c]">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] border border-white/10">
        
        <h2 className="text-3xl font-semibold text-center mb-6 text-purple-200">
          Login 🔐
        </h2>

        {/* 4. Wrap inputs inside a form tag to allow "Enter" key submissions */}
        <form onSubmit={handleLogin}>
          
          {/* Conditional Error Display */}
          {error && (
            <div className="mb-4 p-3 text-sm text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
              {error}
            </div>
          )}

          {/* Email */}
          <input
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white placeholder-purple-300/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          {/* Password */}
          <input
            type="password"
            required
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg bg-white/10 text-white placeholder-purple-300/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-lg font-medium bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 transition-all duration-300 shadow-lg hover:shadow-purple-500/40 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;