import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // 1. Import useNavigate
import api from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Adding loading and error states for better UX
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate(); // 2. Initialize the hook

  // const handleLogin = async (e) => {
  //   e.preventDefault(); // Prevents page reload on form submit
  //   setIsLoading(true);
  //   setError(null);

  //   try {
  //     const res = await axios.post("http://localhost:5000/api/auth/login", {
  //       email,
  //       password,
  //     });

  //     console.log("Success:", res.data);

  //     // 3. Redirect the user to the chat page immediately
  //     navigate("/chat");

  //   } catch (err) {
  //     console.error(err);
  //     setError(err.response?.data?.message || "Login failed ❌");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      console.log(res.data);

      // ✅ assume backend returns user object
      // const userId = res.data._id; // or res.data.user._id
      //const userId = res.data.user._id;
      //onsole.log("Sender ID:", email);
      // const userId = res.data._id;

      // store user
      //localStorage.setItem("userId", userId);

      //navigate("/chat");
      // ✅ store token
      //localStorage.setItem("token", res.data.token);

      // ✅ store userId
      // localStorage.setItem("userId", res.data.user._id);
      // localStorage.setItem("token", res.data.token);
      // localStorage.setItem("userId", res.data.user._id);
      sessionStorage.setItem("userId", res.data.user._id);
sessionStorage.setItem("token", res.data.token);
const senderId = localStorage.getItem("userId");

console.log("SENDER ID:", senderId);
      navigate("/chat");

      // 🔥 IMPORTANT
      //navigate(`/chat?userId=${userId}`);

    } catch (err) {
      setError(err.response?.data?.message || "Login failed ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (

    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* 🎥 SAME BACKGROUND VIDEO */}
      <video
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover -z-20"
      />

      {/* 🔮 OVERLAY FOR READABILITY */}
      <div className="absolute inset-0 bg-gradient-to-br 
    from-[#14001f]/80 via-[#240046]/70 to-[#3c096c]/80 -z-10"
      />

      {/* OPTIONAL GLOW EFFECT */}
      <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] 
    bg-purple-600 rounded-full blur-[120px] opacity-40 animate-pulse -z-10"
      />

      <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] 
    bg-violet-500 rounded-full blur-[120px] opacity-40 animate-pulse -z-10"
      />

      {/* LOGIN BOX */}
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-[350px] border border-white/10 z-10">

        <h2 className="text-3xl font-semibold text-center mb-6 text-purple-200">
          Login 🔐
        </h2>

        <form onSubmit={handleLogin}>

          {error && (
            <div className="mb-4 p-3 text-sm text-red-200 bg-red-500/20 border border-red-500/30 rounded-lg text-center">
              {error}
            </div>
          )}

          <input
            type="email"
            required
            placeholder="Email"
            className="w-full p-3 mb-4 rounded-lg bg-white/10 text-white placeholder-purple-300/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full p-3 mb-6 rounded-lg bg-white/10 text-white placeholder-purple-300/60 border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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