import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const CountUp = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime = null;
    const endValue = parseInt(end);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * endValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };

    window.requestAnimationFrame(step);
  }, [end, duration]);

  return <span>{count}{suffix}</span>;
};

export default function HomePage() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Mouse Position State for Interactive Background
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleBookingClick = () => {
    const isLoggedIn = localStorage.getItem("isAuthenticated") === "true";
    if (!isLoggedIn) {
      setShowModal(true);
    } else {
      navigate("/book");
    }
  };

  // --- APNI MARZI KE IMAGE LINKS YAHAN DALEIN (5 LINKS) ---
const officerImages = [
    "https://goldenglobes.com/wp-content/uploads/2023/10/ana_de_armas_111519_knives_out_1.jpg?w=600?w=600",
    "https://cdn.mos.cms.futurecdn.net/6ef29f0fca2c287b96f2575b72576756.jpg",
    "https://i.pinimg.com/736x/a5/64/97/a564974f219bd45c492db60afc311902.jpg",
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTaMPi36sm8pUG2b5tqAX5Kpgudz3-cY6Xhuw&s",
    "https://upload.wikimedia.org/wikipedia/en/7/79/Rehman_Dakait.png",
  ];
  // -----------------------------------------------------------

  const stats = [
    { id: "01", value: "241", suffix: "", label: "Slots Booked Today" },
    { id: "02", value: "98", suffix: "%", label: "Queue Efficiency" },
    { id: "03", value: "15", suffix: " mins", label: "Avg. Waiting Time" },
  ];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-[#000000] overflow-x-hidden selection:bg-purple-500/30"
    >

      {/* --- MOUSE TRACKING GLOW LAYER --- */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(107, 26, 126, 0.15), transparent 80%)`
        }}
      />

      {/* Static Background Decor Blobs */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#6b1a7e]/10 blur-[120px] rounded-full"></div>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center">
        <Navbar />

        {/* Hero Section */}
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between min-h-[90vh] max-w-7xl mx-auto pt-24 pb-12 px-6 sm:px-8 gap-16 lg:gap-12 w-full">

          <div className="flex-1 text-center lg:text-left space-y-6">
            <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Building the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-white">
                Digital Queue
              </span>
            </h1>
            <p className="text-white/60 text-base sm:text-lg lg:text-xl max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              No more long lines at government offices. Book your smart slot from home and track your turn live.
            </p>
            <button
              onClick={handleBookingClick}
              className="px-8 py-4 bg-purple-600 text-white font-bold rounded-full hover:bg-purple-700 transition-all shadow-lg shadow-purple-500/20 active:scale-95"
            >
              Book Your Slot Now
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center lg:items-end justify-center w-full">
            <div className="p-6 sm:p-10 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl relative">
              <div className="absolute inset-0 bg-purple-600/10 blur-[60px] rounded-full"></div>
              <h3 className="relative z-10 text-white/40 text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-8 text-center font-bold">
                On-Going Verifications
              </h3>
              <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-6">
                {/* YAHAN BADLAO KIYA GAYA HAI */}
                {officerImages.map((link, index) => (
                  <div key={index} className="w-12 h-12 sm:w-16 sm:h-16 rounded-full border border-white/20 bg-white/10 overflow-hidden shadow-xl">
                    <img src={link} alt={`Officer ${index + 1}`} className="w-full h-full object-cover opacity-80" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Counter Section */}
        <div className="max-w-6xl mx-auto px-6 pb-12 w-full">
          <div className="bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/5 rounded-[30px] py-8 px-6 grid grid-cols-1 sm:grid-cols-3 gap-10">
            {stats.map((stat) => (
              <div key={stat.id} className="relative group flex flex-col items-center sm:items-start sm:px-8">
                <span className="text-white/30 text-[10px] font-bold tracking-widest uppercase mb-1">{stat.id}</span>
                <h2 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight group-hover:text-purple-400 transition-all">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </h2>
                <p className="text-white/40 text-[11px] mt-2 uppercase">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* --- NAYA SECTION: HOW IT WORKS --- */}
        <div className="max-w-7xl mx-auto px-6 pt-16 pb-20 w-full">
          <h2 className="text-white text-3xl sm:text-4xl font-bold text-center mb-12">
            HOW IT WORKS? <span className="text-purple-400">Easy Steps</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 Card */}
            <div className="bg-white/5 border border-purple-500/20 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors shadow-lg">
              <div className="text-4xl mb-4">
                <span className="text-purple-400">1.</span> 
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Book Your Slot</h3>
              <p className="text-white/60">Select the service and office from home and book your preferred slot.</p>
            </div>
            {/* Step 2 Card */}
            <div className="bg-white/5 border border-purple-500/20 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors shadow-lg">
              <div className="text-4xl mb-4">
                <span className="text-purple-400">2.</span> 
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Track Live Status</h3>
              <p className="text-white/60">Check your turn`s live status, token number, and estimated waiting time.</p>
            </div>
            {/* Step 3 Card */}
            <div className="bg-white/5 border border-purple-500/20 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors shadow-lg">
              <div className="text-4xl mb-4">
                <span className="text-purple-400">3.</span> 
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">Instant Service</h3>
              <p className="text-white/60">Arrive at the office at the right time and get the service without standing in long lines.</p>
            </div>
          </div>

        </div>

        {/* ADMIN PORTAL SECTION (Existing) */}
        <div className="max-w-6xl mx-auto px-6 pb-20 w-full mt-8">
          <div className="flex flex-col md:flex-row gap-8 items-center justify-between p-8 md:p-12 rounded-[40px] border border-white/10 bg-white/5 backdrop-blur-xl group hover:border-purple-500/30 transition-all duration-700">
            <div className="flex-1 space-y-4 text-center md:text-left">
              <h2 className="text-white text-3xl font-bold tracking-tight">
                Staff & <span className="text-purple-400">Admin</span> Portal
              </h2>
              <p className="text-white/60 text-base font-light">
                Manage counters and call citizen tokens in real-time. Secured Govt. Terminal access.
              </p>
            </div>
            <button
              onClick={() => navigate("/admin")}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all"
            >
              Officer Terminal Access
            </button>
          </div>
        </div>

        {/* PREMIUM MODAL (Existing) */}
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
                  To book an online slot, you must sign in first!!
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => navigate("/login")}
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