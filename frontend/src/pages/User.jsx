import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [tokenStatus, setTokenStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Get logged-in user email
  const storedUser = localStorage.getItem("user");
  const userEmail = storedUser ? JSON.parse(storedUser).email : null;

  // 🔹 Fetch user's ongoing token
  const fetchUserToken = async () => {
    if (!userEmail) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get(
        `http://localhost:5000/api/queue/history/${userEmail}`
      );
      // Find ongoing token (Pending or In Progress)
      const ongoing = res.data.find(
        t => t.status === "Pending" || t.status === "In Progress"
      );

      if (ongoing) {
        // Track token using track API for position & wait time
        const trackRes = await axios.get(
          `http://localhost:5000/api/queue/track/${ongoing.tokenID}`
        );
        setTokenStatus(trackRes.data);
        localStorage.setItem("myToken", ongoing.tokenID); // Update localStorage
      } else {
        setTokenStatus(null);
        localStorage.removeItem("myToken");
      }
    } catch (error) {
      console.log("Fetching token error:", error);
      setTokenStatus(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserToken();
    const interval = setInterval(fetchUserToken, 5000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#6b1a7e] overflow-hidden">
      <UserSidebar />

      <div className="flex flex-col items-center justify-center min-h-screen pt-28 pb-12 px-4 relative z-10">

        {tokenStatus ? (
          <>
            {/* ✅ STATS SECTION (FIXED LOCATION) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10 max-w-4xl w-full">
              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
                <p className="text-white/40 text-xs font-bold uppercase">
                  People Ahead of You
                </p>
                <h2 className="text-4xl font-bold text-purple-400 mt-2">
                  {tokenStatus.peopleAhead ?? "-"}
                </h2>
              </div>

              <div className="p-6 bg-white/5 border border-white/10 rounded-3xl text-center">
                <p className="text-white/40 text-xs font-bold uppercase">
                  Est. Waiting Time
                </p>
                <h2 className="text-4xl font-bold text-blue-400 mt-2">
                  {tokenStatus.waitTime ?? "-"} Mins
                </h2>
              </div>
            </div>

            {/* TOP STATUS CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl w-full mb-8">
              <div className="p-6 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md text-center">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                  Your Token
                </p>
                <p className="text-white text-3xl font-bold mt-2">
                  {tokenStatus.token?.tokenID}
                </p>
              </div>

              <div className="p-6 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md text-center">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                  Position in Queue
                </p>
                <p className="text-purple-400 text-3xl font-bold mt-2">
                  {tokenStatus.position === 1
                    ? "Next!"
                    : tokenStatus.position}
                </p>
              </div>

              <div className="p-6 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md text-center">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                  Department
                </p>
                <p className="text-white text-xl font-bold mt-2">
                  {tokenStatus.token?.department}
                </p>
              </div>

              <div className="p-6 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-md text-center">
                <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">
                  Status
                </p>
                <p
                  className={`text-xl font-bold mt-2 ${
                    tokenStatus.token?.status === "In Progress"
                      ? "text-green-400 animate-pulse"
                      : "text-white"
                  }`}
                >
                  {tokenStatus.token?.status}
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[40px] border border-white/20 bg-white/5 backdrop-blur-xl text-center w-full max-w-2xl">
              <h2 className="text-white text-2xl font-bold mb-4">
                Live Tracking Active
              </h2>
              <p className="text-white/60">
                Please wait for your turn. The screen will update automatically.
              </p>

              {tokenStatus.token?.status === "In Progress" && (
                <div className="mt-6 p-4 bg-green-500/20 border border-green-500/40 rounded-2xl">
                  <h3 className="text-green-400 font-bold text-xl">
                    IT&apos;S YOUR TURN!
                  </h3>
                  <p className="text-white/80">
                    Please proceed to the counter.
                  </p>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-white text-3xl font-bold mb-6">
              No Active Booking Found
            </h2>
            <button
              onClick={() => navigate("/book")}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:scale-105 transition-all"
            >
              Book a New Slot
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
