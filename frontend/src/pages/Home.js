import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="h-screen bg-[#0b141a] text-white flex">

      <div className="hidden md:flex flex-col w-1/3 bg-[#111b21] border-r border-gray-800">

        <div className="p-4 bg-[#202c33] flex items-center justify-between">
          <h1 className="text-xl font-semibold">PingMe</h1>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          <div className="bg-[#202c33] p-3 rounded-lg">
            <p className="font-medium">Amit</p>
            <p className="text-sm text-gray-400">Hey! 👋</p>
          </div>

          <div className="bg-[#202c33] p-3 rounded-lg">
            <p className="font-medium">Rahul</p>
            <p className="text-sm text-gray-400">Kya haal hai?</p>
          </div>

          <div className="bg-[#202c33] p-3 rounded-lg">
            <p className="font-medium">Neha</p>
            <p className="text-sm text-gray-400">Let's catch up!</p>
          </div>
        </div>

      </div>

      <div className="flex flex-col flex-1">

        <div className="bg-[#202c33] p-4 flex items-center justify-between border-b border-gray-800">
          <div>
            <p className="font-semibold">Amit</p>
            <p className="text-xs text-gray-400">online</p>
          </div>
        </div>

        <div className="flex-1 p-6 space-y-3 overflow-y-auto bg-[#0b141a]">
          <div className="bg-[#202c33] p-3 rounded-lg w-fit">
            Hello bhai 😄
          </div>
          <div className="bg-[#005c4b] p-3 rounded-lg w-fit ml-auto">
            Hey! 👋
          </div>
          <div className="bg-[#005c4b] p-3 rounded-lg w-fit ml-auto">
            PingMe ready hai 🚀
          </div>
        </div>

        <div className="p-4 bg-[#202c33] flex items-center gap-3">
          <input
            type="text"
            placeholder="Type a message"
            className="flex-1 bg-[#2a3942] p-3 rounded-full outline-none text-sm"
          />
          <Link
            to="/chat"
            className="bg-[#00a884] px-5 py-2 rounded-full text-sm hover:bg-[#019875] transition"
          >
            Send
          </Link>
        </div>

      </div>

    </div>
  );
}

export default Home;