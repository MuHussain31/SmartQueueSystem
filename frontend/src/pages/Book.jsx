import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";

export default function BookSlot() {
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    dept: "",
    service: "",
    date: "",
    time: ""
  });

  const [tokenGenerated, setTokenGenerated] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  // Auto-fill Name/Email
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userObj = JSON.parse(storedUser);
      setFormData(prev => ({
        ...prev,
        name: userObj.name,
        email: userObj.email
      }));
    }
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);
    setShowErrorModal(false);

    try {
      const response = await axios.post("http://localhost:5000/api/queue/book", formData);

      const newToken = response.data.token;
      setTokenGenerated(newToken.tokenID);
      localStorage.setItem("myToken", newToken.tokenID);
      setShowSuccessModal(true);

    } catch (error) {
      console.error("Booking Error:", error);
      setErrorMsg(error.response?.data?.message || "Booking Failed!");
      setShowErrorModal(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] overflow-hidden relative">

      {/* SIDEBAR */}
      <UserSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64 relative min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#2e0b36]">
        <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4 md:px-12">

          <div className="text-center mb-10">
            <h1 className="text-white text-3xl md:text-5xl font-bold tracking-tight mb-2">
              New <span className="text-purple-400">Appointment</span>
            </h1>
            <p className="text-white/40 text-sm">Fill the details below to reserve your spot.</p>
          </div>

          {/* Form Card */}
          <div className="w-full max-w-2xl p-8 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <form onSubmit={handleBooking} className="space-y-6">

              {/* Name & Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Full Name</label>
                  <input type="text" required value={formData.name}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Email</label>
                  <input type="email" value={formData.email}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 focus:bg-white/10 transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              {/* Department & Service */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Organization</label>
                  <select required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 cursor-pointer"
                    onChange={(e) => setFormData({...formData, dept: e.target.value})}
                  >
                    <option value="" className="bg-[#1a051f]">Select Org</option>
                    <option value="NADRA" className="bg-[#1a051f]">NADRA</option>
                    <option value="Passport" className="bg-[#1a051f]">Passport Office</option>
                    <option value="FBR" className="bg-[#1a051f]">FBR Taxation</option>
                    <option value="SUI" className="bg-[#1a051f]">SUI GAS</option>
                    <option value="DLS" className="bg-[#1a051f]">DLS Sindh</option>
                    <option value="AC" className="bg-[#1a051f]">A.C. Office</option>
                    <option value="SIUT" className="bg-[#1a051f]">SIUT Hospital</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Service</label>
                  <select required className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 cursor-pointer"
                    onChange={(e) => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="" className="bg-[#1a051f]">Select Service</option>
                    <option value="New Issuance" className="bg-[#1a051f]">New Issuance</option>
                    <option value="Renewal" className="bg-[#1a051f]">Renewal</option>
                    <option value="Verification" className="bg-[#1a051f]">Verification</option>
                    <option value="Complaint" className="bg-[#1a051f]">Complaint Token</option>
                    <option value="Others" className="bg-[#1a051f]">Others</option>
                    <option value="Document Application" className="bg-[#1a051f]">Document Application</option>
                  </select>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Date</label>
                  <input type="date" required 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 cursor-pointer"
                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-bold uppercase ml-4">Time Slot</label>
                  <input type="time" required 
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 cursor-pointer"
                    onChange={(e) => setFormData({...formData, time: e.target.value})}
                  />
                </div>
              </div>

              <button type="submit" disabled={loading}
                className={`w-full py-4 bg-white text-black font-bold rounded-2xl transition-all duration-300 ${loading ? "opacity-50" : "hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:scale-[1.01]"}`}
              >
                {loading ? "Processing..." : "Confirm Booking"}
              </button>

            </form>
          </div>
        </div>

        {/* SUCCESS MODAL */}
        {showSuccessModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative bg-[#1a051f] border border-white/20 p-8 rounded-[40px] max-w-sm w-full shadow-2xl">
              <div className="text-center">
                <h2 className="text-white text-2xl font-bold mb-2">Slot Reserved!</h2>
                <h1 className="text-purple-400 text-5xl font-black my-4">{tokenGenerated}</h1>
                <button onClick={() => navigate("/dashboard")} className="w-full py-3 bg-white text-black font-bold rounded-xl mt-4">Go to Dashboard</button>
              </div>
            </div>
          </div>
        )}

        {/* ERROR MODAL */}
        {showErrorModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-md">
            <div className="absolute inset-0 bg-black/60"></div>
            <div className="relative bg-[#1a051f] border border-white-500 p-8 rounded-[40px] max-w-sm w-full shadow-2xl">
              <div className="text-center">
                <p className="text-white/60 mb-4">{errorMsg}</p>
                <button onClick={() => setShowErrorModal(false)} className="w-full py-3 bg-[#ffffff] text-black font-bold rounded-xl mt-2">Close</button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
