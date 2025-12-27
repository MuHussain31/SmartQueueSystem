import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function LoginRegister() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const navigate = useNavigate();

  // States
  const [name, setName] = useState(""); // Signup ke liye
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setModalMessage(data.message || "Login failed");
        setShowModal(true);
        return;
      }

      // 🛑 FIX: Login se pehle purana sab data (jaise purani booking id) saaf karo
      localStorage.clear(); 

      // ✅ Ab bilkul fresh data save karo
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user)); 
      
      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      setModalMessage("Server error");
      setShowModal(true);
    }
  };

  // Handle Register
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setModalMessage(data.message || "Registration failed");
        setShowModal(true);
        return;
      }

      setModalMessage("Registration Successful! Please Login.");
      setShowModal(true);
      setIsSignIn(true); // Switch to login view
    } catch (error) {
      setModalMessage("Server error during registration");
      setShowModal(true);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#6b1a7e] px-4 pt-32 pb-10">
      <Navbar />

      <div className="relative w-[900px] h-[550px] border border-white/20 bg-white/5 backdrop-blur-xl rounded-[50px] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex">
        
        {/* SIGN-IN FORM */}
        <form
          onSubmit={handleLogin}
          className={`w-1/2 flex flex-col justify-center px-12 transition-all duration-700 ease-in-out absolute h-full ${
            isSignIn ? "translate-x-0 opacity-100 z-20" : "-translate-x-20 opacity-0 z-0 pointer-events-none"
          }`}
        >
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Sign In</h2>
          <div className="mb-4">
            <p className="text-white/60 mb-1 ml-1 text-sm">Email</p>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white outline-none focus:border-white/50"
            />
          </div>
          <div className="mb-4">
            <p className="text-white/60 mb-1 ml-1 text-sm">Password</p>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white outline-none focus:border-white/50"
            />
          </div>
          <button type="submit" className="w-full py-3 mt-4 rounded-full bg-white text-black font-bold hover:scale-[1.02] transition-all">
            SIGN IN
          </button>
        </form>

        {/* SIGN-UP FORM */}
        <form
          onSubmit={handleRegister}
          className={`w-1/2 flex flex-col justify-center px-12 transition-all duration-700 ease-in-out absolute h-full right-0 ${
            !isSignIn ? "translate-x-0 opacity-100 z-20" : "translate-x-20 opacity-0 z-0 pointer-events-none"
          }`}
        >
          <h2 className="text-4xl font-bold text-white mb-6 text-center">Create Account</h2>
          <div className="mb-4">
            <p className="text-white/60 mb-1 ml-1 text-sm">Full Name</p>
            <input
              type="text"
              value={name}
              required
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white outline-none focus:border-white/50"
            />
          </div>
          <div className="mb-4">
            <p className="text-white/60 mb-1 ml-1 text-sm">Email</p>
            <input
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white outline-none focus:border-white/50"
            />
          </div>
          <div className="mb-4">
            <p className="text-white/60 mb-1 ml-1 text-sm">Password</p>
            <input
              type="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-white/10 border border-white/20 rounded-full px-5 py-3 text-white outline-none focus:border-white/50"
            />
          </div>
          <button type="submit" className="w-full py-3 mt-4 rounded-full bg-white text-black font-bold hover:scale-[1.02] transition-all">
            SIGN UP
          </button>
        </form>

        {/* Sliding Overlay Panel */}
        <div
          className={`absolute top-0 w-1/2 h-full bg-gradient-to-br from-indigo-600/40 to-[#6b1a7e]/60 backdrop-blur-3xl border-white/20 text-white p-10 flex flex-col justify-center items-center transition-all duration-700 ease-in-out z-30 ${
            isSignIn 
              ? "left-1/2 rounded-l-[100px] border-l" 
              : "left-0 rounded-r-[100px] border-r"
          }`}
        >
          <h2 className="text-4xl font-bold mb-4 text-center">
            {isSignIn ? "Welcome Back!" : "Hello, Friend!"}
          </h2>
          <p className="mb-10 text-center text-white/70 leading-relaxed">
            {isSignIn 
              ? "To keep connected with us please login with your personal info" 
              : "Enter your personal details"}
          </p>
          <button
            onClick={() => setIsSignIn(!isSignIn)}
            className="px-12 py-3 border border-white/40 rounded-full text-lg font-semibold hover:bg-white/10 transition-all"
          >
            {isSignIn ? "GO TO SIGN UP" : "GO TO SIGN IN"}
          </button>
        </div>

      </div>

      {/* AUTH MODAL */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-md text-center animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-bold text-purple-400 mb-3">
              Notification
            </h2>
            <p className="text-white/70 text-sm mb-6">
              {modalMessage}
            </p>
            <button
              onClick={() => setShowModal(false)}
              className="px-10 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition"
            >
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
}