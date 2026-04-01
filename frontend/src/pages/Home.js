import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen bg-[#111b21] text-white flex flex-col">

      

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center px-6">

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl">

          {/* Left Content */}
          <div>
            <h2 className="text-5xl font-bold leading-tight mb-6">
              Simple. Secure. <br /> Real-time Messaging 💬
            </h2>

            <p className="text-gray-400 mb-8 text-lg">
              With PingMe, connect instantly with your friends. 
              Experience fast, secure, and seamless chatting just like WhatsApp.
            </p>

            <div className="space-x-4">
              <Link
                to="/chat"
                className="bg-[#00a884] px-7 py-3 rounded-full text-lg hover:bg-[#019875] transition"
              >
                Start Chat 🚀
              </Link>

              <Link
                to="/register"
                className="border border-gray-400 px-7 py-3 rounded-full text-lg hover:bg-gray-700 transition"
              >
                Create Account
              </Link>
            </div>
          </div>

          {/* Right Side Chat Mockup */}
          <div className="hidden md:flex justify-center">
            <div className="bg-[#202c33] p-4 rounded-2xl shadow-xl w-[320px]">

              {/* Chat header */}
              <div className="bg-[#2a3942] p-3 rounded-lg mb-3">
                <p className="font-semibold">Amit</p>
                <p className="text-xs text-gray-400">online</p>
              </div>

              {/* Chat messages */}
              <div className="space-y-2 text-sm">
                <div className="bg-[#005c4b] p-2 rounded-lg w-fit ml-auto">
                  Hey! 👋
                </div>
                <div className="bg-[#2a3942] p-2 rounded-lg w-fit">
                  Hello bhai 😄
                </div>
                <div className="bg-[#005c4b] p-2 rounded-lg w-fit ml-auto">
                  PingMe ready hai 🚀
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Footer */}
      <div className="text-center py-4 text-gray-500 text-sm">
        Built with ❤️ by Amit | PingMe 2026
      </div>

    </div>
  );
}

export default Home;