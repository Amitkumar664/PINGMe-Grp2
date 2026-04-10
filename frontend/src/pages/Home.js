import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex flex-col text-white">

      {/* ================= HERO SECTION ================= */}
      <div className="relative flex flex-1 items-center justify-center px-6 overflow-hidden">

        {/* 🎥 FULL BACKGROUND VIDEO */}
        <video
          src="/video.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover -z-20"
        />

        {/* 🔮 DARK + PURPLE OVERLAY (IMPORTANT FOR READABILITY) */}
        <div className="absolute inset-0 bg-gradient-to-br 
  from-[#14001f]/80 via-[#240046]/70 to-[#3c096c]/80 -z-10" />

        {/* ✨ OPTIONAL GLOW EFFECT */}
        <div className="absolute top-[-100px] left-[-100px] w-[300px] h-[300px] 
  bg-purple-600 rounded-full blur-[120px] opacity-40 animate-pulse -z-10" />

        <div className="absolute bottom-[-100px] right-[-100px] w-[300px] h-[300px] 
  bg-violet-500 rounded-full blur-[120px] opacity-40 animate-pulse -z-10" />


        {/* ================= CONTENT ================= */}
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl w-full z-10">

          {/* LEFT */}
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6 
      bg-gradient-to-r from-purple-300 to-violet-400 
      bg-clip-text text-transparent">
              Simple. Secure. <br /> Real-time Messaging 💬
            </h2>

            <p className="text-purple-200/90 mb-8 text-lg">
              With PingMe, connect instantly with your friends.
              Experience fast, secure, and seamless chatting.
            </p>

            <div className="flex gap-4">
              <Link
                to="/login"
                className="px-7 py-3 rounded-full text-lg font-medium 
          bg-gradient-to-r from-purple-500 to-violet-600
          hover:from-purple-600 hover:to-violet-700
          transition-all duration-300 shadow-lg hover:shadow-purple-500/40" style={{ textDecoration: "none", color: "white" }}
              >
                Start Chat 🚀
              </Link>

              <Link
                to="/register"
                className="px-7 py-3 rounded-full text-lg font-medium 
          border border-purple-300/40
          hover:bg-white/10 transition-all duration-300" style={{ textDecoration: "none", color: "white" }}
              >
                Create Account
              </Link>
            </div>
          </div>


          {/* RIGHT (OPTIONAL CONTENT / REMOVE IF YOU WANT CLEAN LOOK) */}
          <div className="hidden md:flex justify-center">
            <div className="bg-white/10 backdrop-blur-lg 
      p-4 rounded-2xl shadow-2xl w-[320px] border border-white/10">

              <div className="bg-white/10 p-3 rounded-lg mb-3">
                <p className="font-semibold text-purple-200">Amit</p>
                <p className="text-xs text-purple-300/60">online</p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="bg-purple-600 p-2 rounded-lg w-fit ml-auto">
                  Hey! 👋
                </div>
                <div className="bg-white/10 p-2 rounded-lg w-fit">
                  Hello bhai 😄
                </div>
                <div className="bg-purple-600 p-2 rounded-lg w-fit ml-auto">
                  PingMe ready hai 🚀
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>


      {/* ================= FOOTER ================= */}
      <div className="w-full py-4 px-8 text-center 
bg-gradient-to-r from-[#14001f] via-[#240046] to-[#3c096c] 
border-t border-white/10 shadow-inner">

        <p className="text-sm text-purple-300/80">
          Built with ❤️ by <span className="text-purple-200 font-medium">Amit</span> | PingMe 2026
        </p>

      </div>

    </div>
  );
}

export default Home;