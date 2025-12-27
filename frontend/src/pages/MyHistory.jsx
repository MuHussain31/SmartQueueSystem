import { useEffect, useState } from "react";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";

export default function MyHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1️⃣ Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);

      // 2️⃣ If no user, stop
      if (!user?.email) {
        setHistory([]);
        setLoading(false);
        return;
      }

      try {
        // 3️⃣ Use lowercase email for safety
        const userEmail = user.email.toLowerCase().trim();
        const res = await axios.get(
          `http://localhost:5000/api/queue/history/${userEmail}`
        );

        console.log("History API response:", res.data); // Debug
        setHistory(res.data || []);
      } catch (error) {
        console.error("History fetch error:", error);
        setHistory([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, [user?.email]);

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] overflow-hidden relative">
      <UserSidebar />

      <div className="flex-1 md:ml-64 min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#2e0b36] px-6 py-10">
        <h1 className="text-white text-3xl md:text-4xl font-bold mb-8">
          My <span className="text-purple-400">History</span>
        </h1>

        {loading && (
          <p className="text-white/60">Loading your booking history...</p>
        )}

        {!loading && history.length === 0 && (
          <div className="text-white/60 text-center mt-20">
            <p className="text-xl font-semibold">No past bookings found</p>
            <p className="text-sm mt-2">
              Jab aap slots book karenge, wo yahan show honge.
            </p>
          </div>
        )}

        {!loading && history.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {history.map((item) => {
              const createdDate = new Date(item.createdAt);
              const formattedDate = createdDate.toLocaleDateString();
              const formattedTime = createdDate.toLocaleTimeString();

              return (
                <div
                  key={item._id}
                  className="p-6 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl"
                >
                  <p className="text-white/40 text-[10px] font-bold uppercase">
                    Token ID
                  </p>
                  <p className="text-white text-2xl font-bold mb-3">
                    {item.tokenID}
                  </p>

                  <div className="space-y-1 text-sm">
                    <p className="text-white/70">
                      <span className="text-white/40">Department:</span>{" "}
                      {item.department}
                    </p>

                    <p className="text-white/70">
                      <span className="text-white/40">Service:</span>{" "}
                      {item.service || "—"}
                    </p>

                    <p className="text-white/70">
                      <span className="text-white/40">Date:</span>{" "}
                      {formattedDate}
                    </p>

                    <p className="text-white/70">
                      <span className="text-white/40">Time:</span>{" "}
                      {formattedTime}
                    </p>
                  </div>

                  <div className="mt-4">
                    <span
                      className={`px-4 py-1 rounded-full text-xs font-bold ${
                        item.status === "Completed"
                          ? "bg-green-500/20 text-green-400"
                          : item.status === "Cancelled"
                          ? "bg-red-500/20 text-red-400"
                          : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {item.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
