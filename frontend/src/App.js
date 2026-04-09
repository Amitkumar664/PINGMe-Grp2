// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ChatPage from "./pages/ChatPage";

// function App() {
//   return (
//     <BrowserRouter>
//       <Navbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/chat" element={<ChatPage />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";

// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import ChatPage from "./pages/ChatPage";

// function App() {
//   return (
//     <Router>

//       {/* ✅ Global Navbar */}
//       <Navbar />

//       {/* ✅ All Pages */}
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/chat" element={<ChatPage />} />
//       </Routes>

//     </Router>
//   );
// }

// export default App;
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChatPage from "./pages/ChatPage";

function AppContent() {
  const location = useLocation();

  // ❌ Hide navbar on chat page
  const hideNavbar = location.pathname === "/chat";

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;