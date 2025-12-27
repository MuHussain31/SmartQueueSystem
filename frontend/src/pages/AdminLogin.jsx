import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("admin@test.com");
  const [password, setPassword] = useState("123");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);


  const handleAdminLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    // Hardcoded Verification Logic
    setTimeout(() => {
      if (email === "admin@test.com" && password === "123") {
        console.log("Admin Authorized");
        // Login ke baad counter officer dashboard par le jayenge
        navigate("/admin-dashboard"); 
      } else {
                setShowModal(true);
      }
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#110214] to-[#2e0b36] flex flex-col items-center justify-center px-4 relative">

      {/* Decorative Blur Elements */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-600/20 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-indigo-600/20 blur-[120px] rounded-full"></div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 rounded-[40px] shadow-2xl overflow-hidden">
          
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-white/10 rounded-3xl flex items-center justify-center mx-auto mb-6 border border-white/20">
              <span className="text-4xl">🏢</span>
            </div>
            <h1 className="text-white text-3xl font-bold tracking-tight">Officer <span className="text-purple-400">Portal</span></h1>
            <p className="text-white/40 text-sm mt-2">Smart Queue Management System</p>
          </div>

          <form onSubmit={handleAdminLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-4">Authorized Email</label>
              <input 
                type="email" 
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white outline-none focus:border-purple-500 transition-all text-sm"
                placeholder="officer@govt.pk"
              />
            </div>

            <div className="space-y-2">
              <label className="text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] ml-4">Access Code</label>
              <input 
                type="password" 
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white outline-none focus:border-purple-500 transition-all text-sm"
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className={`w-full py-4 bg-white text-black font-bold rounded-full shadow-lg transition-all duration-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-purple-500/40 hover:scale-[1.02]'}`}
            >
              {loading ? "AUTHENTICATING..." : "SECURE LOGIN"}
            </button>
          </form>

          <div className="mt-8 text-center border-t border-white/10 pt-6">
            <p className="text-white/30 text-[10px] uppercase tracking-widest leading-relaxed">
              This terminal is strictly for <br /> Government Officials only.
            </p>
          </div>
        </div>
      </div>
      {/* ACCESS DENIED MODAL */}
{showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
    <div className="bg-[#111] border border-white/10 rounded-3xl p-8 w-full max-w-md text-center animate-in fade-in zoom-in duration-200">
      
      <h2 className="text-2xl font-bold text-red-400 mb-3">
        Access Denied
      </h2>

      <p className="text-white/60 text-sm mb-6">
        Invalid admin credentials. Please try again.
      </p>

      <button
        onClick={() => setShowModal(false)}
        className="px-8 py-3 bg-white text-black font-bold rounded-2xl hover:bg-gray-200 transition"
      >
        OK
      </button>
    </div>
  </div>
)}
    </div>
  );
}