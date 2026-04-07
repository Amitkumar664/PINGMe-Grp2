import { useState } from "react";
import axios from "axios";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", {
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
    <div className="min-h-screen flex items-center justify-center 
    bg-gradient-to-br from-[#14001f] via-[#240046] to-[#3c096c]">

      <div className="bg-white/10 backdrop-blur-lg 
      p-8 rounded-2xl shadow-2xl w-[350px] border border-white/10">

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