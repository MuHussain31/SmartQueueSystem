import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useState } from "react"; // useState import kiya gaya

export default function ServicesPage() {
  const navigate = useNavigate();
  const [showSuggestionModal, setShowSuggestionModal] = useState(false); // Naya state for modal

  // Function jo "View Catalog" button click par navigate karega
  const handleViewCatalog = () => {
    navigate("/pricing"); // PricingPage ke route par navigate karega
  };

  // Function jo modal open karega
  const handleSuggestNowClick = () => {
    setShowSuggestionModal(true);
  };

  const services = [
    {
      title: "NADRA",
      description: "CNIC, Passport, and Family registration verification via smart queue.",
      icon: "📝",
      color: "from-green-500/20"
    },
    {
      title: "FBR",
      description: "Manage tax filings and NTN registrations without wait times.",
      icon: "⚖️",
      color: "from-blue-500/20"
    },
    {
      title: "SUI GAS",
      description: "Billing and connection complaints managed via digital tokens.",
      icon: "🔥",
      color: "from-orange-500/20"
    },
    {
      title: "DLS",
      description: "Automated test scheduling and renewal with real-time status.",
      icon: "🚗",
      color: "from-purple-500/20"
    },
    {
      title: "A.C. Office Karachi",
     description: "Digitally apply for your domicile certificate and other residential personal documents.",
      icon: "🏛️",
      color: "from-red-500/20"
    },
    {
      title: "SIUT",
      description: "Medical board and clinical verification official queues.",
      icon: "🏥",
      color: "from-emerald-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#6b1a7e] overflow-x-hidden relative">
      <Navbar />

      <div className="flex flex-col items-center pt-20 pb-16 px-4 max-w-7xl mx-auto relative z-10">
        
        {/* Optimized Headline Section */}
        <div className="text-center mb-10">
          <h1 className="text-white text-4xl md:text-6xl font-bold mb-4 tracking-tight drop-shadow-lg leading-tight">
            Our <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
              Organizations
            </span>
          </h1>
          <p className="text-white/60 text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Essential government services through a wait-free digital infrastructure.
          </p>
        </div>

        {/* Services Grid - Responsive Adjustments */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-6 md:p-8 rounded-[30px] md:rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl transition-all duration-500 hover:border-white/30 hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] hover:-translate-y-1"
            >
              <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} blur-[50px] opacity-0 group-hover:opacity-100 transition-all duration-500`}></div>

              <div className="relative z-10">
                <div className="w-12 h-12 md:w-14 md:h-14 text-3xl md:text-4xl mb-4 md:mb-6 bg-white/10 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform duration-500">
                  {service.icon}
                </div>
                
                <h2 className="text-white text-xl md:text-2xl font-bold mb-3 tracking-tight group-hover:text-purple-400 transition-colors">
                  {service.title}
                </h2>
                
                <p className="text-white/50 text-sm md:text-base leading-relaxed mb-6">
                  {service.description}
                </p>

                <button 
                  onClick={handleViewCatalog}
                  className="flex items-center gap-2 text-white text-sm md:text-base font-medium group/btn"
                >
                  View Catalog 
                  <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Compact CTA Section */}
        <div className="mt-16 w-full p-8 md:p-10 rounded-[30px] md:rounded-[40px] border border-dashed border-white/20 bg-white/5 text-center relative overflow-hidden group">
          <div className="absolute inset-0 bg-purple-600/5 blur-[80px] -z-10"></div>
          <h2 className="text-white text-2xl md:text-3xl font-bold mb-3">Organization not listed?</h2>
          <p className="text-white/60 text-sm md:text-base mb-6">Let's integrate more citizens flows together.</p>
          <button 
            onClick={handleSuggestNowClick} // onClick handler add kiya gaya
            className="px-8 py-3 bg-white text-black text-sm md:text-base rounded-full font-bold hover:bg-purple-100 transition-all active:scale-95"
          >
            Suggest Now
          </button>
        </div>
      </div>

      {/* --- Suggestion Form Modal --- */}
      {showSuggestionModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4 backdrop-blur-sm">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowSuggestionModal(false)}></div>
          <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 p-8 md:p-10 rounded-[40px] max-w-lg w-full shadow-2xl">
            <h2 className="text-white text-2xl font-bold mb-6 text-center">Suggest New Integration</h2>
            
            <form 
              action="https://formsubmit.co/bscs2380200@szabist.pk" // Aapki email
              method="POST"
              className="space-y-4"
            >
              {/* Hidden field to redirect after submission */}
              <input type="hidden" name="_next" value={window.location.href} /> 
              <input type="hidden" name="_subject" value="New Service/Department Suggestion" /> 

              {/* Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">Your Name</label>
                  <input type="text" name="Name" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="Ali Khan" />
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">Your Email</label>
                  <input type="email" name="Email" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="you@example.com" />
                </div>
              </div>

              {/* CNIC and Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">CNIC Number</label>
                  <input type="text" name="CNIC" className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="XXXXX-XXXXXXX-X" />
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">Phone Number</label>
                  <input type="tel" name="Phone Number" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="+92 3XX XXXXXXX" />
                </div>
              </div>

              {/* Service and Department */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">Suggested Department</label>
                  <input type="text" name="Suggested Department" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="e.g., Land Revenue Dept." />
                </div>
                <div className="space-y-1">
                  <label className="text-white/60 text-[12px] font-medium ml-2">Suggested Service</label>
                  <input type="text" name="Suggested Service" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="e.g., Property Transfer Queue" />
                </div>
              </div>

              {/* Message */}
              <div className="space-y-1">
                <label className="text-white/60 text-[12px] font-medium ml-2">Detailed Message</label>
                <textarea rows="3" name="Message" required className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-purple-400 text-sm" placeholder="Explain why this department/service should be integrated."></textarea>
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full py-4 rounded-3xl bg-white text-black font-bold hover:bg-purple-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-[0.98] text-sm uppercase tracking-wide mt-6"
              >
                Submit Suggestion
              </button>
            </form>

            {/* Close Button */}
            <button
              onClick={() => setShowSuggestionModal(false)}
              className="w-full py-2 text-white/30 text-xs uppercase tracking-widest mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}