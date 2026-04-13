import { useState } from "react";
import axios from "axios";
import api from "../services/api";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await api.post("https://pingme-grp2-1.onrender.com/api/auth/register", {
        name,
        email,
        password,
      });

      console.log(res.data);
      alert("Registration successful 🎉");

      // redirect to login
      window.location.href = "/login";

    } catch (err) {
      console.error(err);
      alert("Registration failed ❌");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

  {/* 🎥 BACKGROUND VIDEO */}
  <video
    src="/video.mp4"
    autoPlay
    loop
    muted
    playsInline
    className="absolute inset-0 w-full h-full object-cover -z-20"
  />

  {/* 🔮 OVERLAY */}
  <div className="absolute inset-0 bg-gradient-to-br 
    from-[#14001f]/80 via-[#240046]/70 to-[#3c096c]/80 -z-10" 
  />

  {/* ✨ GLOW EFFECT */}
  <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] 
    bg-purple-600 rounded-full blur-[120px] opacity-40 animate-pulse -z-10" 
  />

  <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] 
    bg-violet-500 rounded-full blur-[120px] opacity-40 animate-pulse -z-10" 
  />

  {/* REGISTER CARD */}
  <div className="bg-white/10 backdrop-blur-lg 
    p-8 rounded-2xl shadow-2xl w-[350px] border border-white/10 z-10">

    <h2 className="text-3xl font-semibold text-center mb-6 text-purple-200">
      Create Account ✨
    </h2>

    {/* Name */}
    <input
      type="text"
      placeholder="Full Name"
      className="w-full p-3 mb-4 rounded-lg 
      bg-white/10 text-white placeholder-purple-300/60
      border border-white/20 focus:outline-none 
      focus:ring-2 focus:ring-purple-500"
      value={name}
      onChange={(e) => setName(e.target.value)}
    />

    {/* Email */}
    <input
      type="email"
      placeholder="Email"
      className="w-full p-3 mb-4 rounded-lg 
      bg-white/10 text-white placeholder-purple-300/60
      border border-white/20 focus:outline-none 
      focus:ring-2 focus:ring-purple-500"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />

    {/* Password */}
    <input
      type="password"
      placeholder="Password"
      className="w-full p-3 mb-6 rounded-lg 
      bg-white/10 text-white placeholder-purple-300/60
      border border-white/20 focus:outline-none 
      focus:ring-2 focus:ring-purple-500"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />

    {/* Button */}
    <button
      onClick={handleRegister}
      className="w-full py-3 rounded-lg font-medium
      bg-gradient-to-r from-purple-500 to-violet-600
      hover:from-purple-600 hover:to-violet-700
      transition-all duration-300 shadow-lg hover:shadow-purple-500/40"
    >
      Register
    </button>

  </div>
</div>
  );
}

export default Register;