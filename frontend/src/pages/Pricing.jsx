import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function PricingPage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Jab user "Go to Service" par click karega
  const handleGoToService = () => {
    // Ye check karega ki user logged in hai ya nahi.
    // Asli application mein, aapko local storage ya context se actual login status lena hoga.
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true"; 
    
    if (!isLoggedIn) {
      setShowModal(true); // Login Modal dikhao
    } else {
      // Agar logged in hai, toh booking page par navigate karo ya jo bhi action ho
      navigate("/book-service"); 
    }
  };


  const pricingData = [
    // --- NADRA Services ---
    {
      department: "National Database and Registration Authority - NADRA",
      color: "from-green-500/20",
      icon: "🪪",
      services: [
        { name: "CNIC Smart Verification", price: 50, unit: "/ per verification" },
        { name: "Family Registration Form (FRC)", price: 150, unit: "/ per request" },
        { name: "Token for New CNIC", price: 0, unit: "/ Free" }
      ],
    },
    // --- FBR Services ---
    {
      department: "Federal Board of Revenue- FBR ",
      color: "from-blue-500/20",
      icon: "⚖️",
      services: [
        { name: "NTN Registration Assistance", price: 700, unit: "/ one-time fee" },
        { name: "Tax Filing Queue Token", price: 100, unit: "/ per filing" },
        { name: "Digital Verification of Documents", price: 50, unit: "/ per document" },
      ],
    },
    // --- SUI GAS/Utility Services ---
    {
      department: "Sui Gas Field - SSGL",
      color: "from-orange-500/20",
      icon: "🔥",
      services: [
        { name: "Billing Complaint Token", price: 0, unit: "/ Free" },
        { name: "New Connection Queue (Priority)", price: 450, unit: "/ per token" },
        { name: "Meter Replacement Scheduling", price: 200, unit: "/ per schedule" },
      ],
    },
    // --- DL/Police Services ---
    {
      department: "Driving License Sindh - DLS",
      color: "from-purple-500/20",
      icon: "🛡️",
      services: [
        { name: "Driving License Renewal Token", price: 150, unit: "/ per renewal" },
        { name: "Test Appointment Booking", price: 250, unit: "/ per test slot" },
        { name: "FIR Tracking Queue Token", price: 0, unit: "/ Free" },
      ],
    },
    {
      department: "SIUT Hospital Queue Management",
      color: "from-red-500/20",
      icon: "🏥",
      services: [
        { name: "First Appointment Token (New Patient)", price: 0, unit: "/ Free" },
        { name: "Follow-up Visit Token (Priority)", price: 50, unit: "/ per visit" },
        { name: "Lab Report Collection Slot", price: 0, unit: "/ Free" },
      ],
    },
    {
      department: "A.C. Office Karachi (Domicile/PRC)",
      color: "from-amber-500/20", // Amber color for official documents
      icon: "📜",
      services: [
        { name: "Domicile Application", price: 100, unit: "/ per submission" },
        { name: "PRC Application", price: 150, unit: "/ per submission" },
        { name: "Citizen Certificate Verification", price: 200, unit: "/ per verification" },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#6b1a7e] overflow-x-hidden relative">
      <Navbar />

      <div className="flex flex-col items-center pt-20 pb-16 px-4 max-w-7xl mx-auto relative z-10">
        
        {/* Headline Section */}
        <div className="text-center mb-12">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg leading-tight">
            Service <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
              Catalog & Pricing
            </span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Choose your required service from the department below to book your digital slot. All charges are for queue priority/digital processing.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full">
          {pricingData.map((data, index) => (
            <div
              key={index}
              className="relative p-6 md:p-8 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(170,0,255,0.15)]"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${data.color} blur-[60px] opacity-20 -z-10 rounded-full`}></div>

              <div className="relative z-10 flex items-center mb-6">
                <div className="w-14 h-14 text-3xl md:text-4xl mr-4 bg-white/10 rounded-2xl flex items-center justify-center">
                  {data.icon}
                </div>
                <h2 className="text-white text-2xl font-bold tracking-tight">
                  {data.department}
                </h2>
              </div>
              
              {/* Service List */}
              <ul className="space-y-4 mb-8">
                {data.services.map((service, sIndex) => (
                  <li key={sIndex} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-b-0 last:pb-0">
                    <p className="text-white text-base font-medium">{service.name}</p>
                    <div className="text-right">
                        {service.price === 0 ? (
                            <span className="text-green-400 text-lg font-bold">FREE</span>
                        ) : (
                            <span className="text-white text-lg font-bold">
                                Rs. {service.price}
                            </span>
                        )}
                        <span className="block text-white/50 text-xs">{service.unit}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleGoToService}
                className="w-full py-3 bg-purple-600 text-white font-bold rounded-xl hover:bg-purple-700 transition-all active:scale-[0.99] shadow-lg shadow-purple-500/20"
              >
                Go to Service Portal →
              </button>
            </div>
          ))}
        </div>

        {/* --- Login Modal --- */}
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm">
            <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)}></div>
            <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-12 rounded-[40px] max-w-sm w-full shadow-2xl">
              <div className="text-center">
                <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <span className="text-3xl">🔑</span>
                </div>
                <h2 className="text-white text-2xl font-bold mb-3">Login Required</h2>
                <p className="text-white/50 text-sm mb-8 leading-relaxed">
                  To book an online slot or access detailed service catalog, you must sign in first!
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => {
                        setShowModal(false);
                        navigate("/login");
                    }}
                    className="w-full py-4 bg-white text-black font-black rounded-2xl hover:scale-[1.02] transition-all"
                  >
                    PROCEED TO LOGIN
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className="w-full py-2 text-white/30 text-xs uppercase tracking-widest"
                  >
                    Maybe Later
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}