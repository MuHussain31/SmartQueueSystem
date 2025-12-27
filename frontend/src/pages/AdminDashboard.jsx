import { useState, useEffect, useRef } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function AdminDashboard() {
  const [currentQueue, setCurrentQueue] = useState([]);
  const [servingToken, setServingToken] = useState(null);
  const [tokensDone, setTokensDone] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const skipNextFetch = useRef(false); // Interval skip

  // 🔹 Fetch Queue
  const fetchQueue = async () => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    try {
      const res = await axios.get("http://localhost:5000/api/queue/list");

      const pending = res.data.filter(t => t.status === "Pending");
      const inProgress = res.data.find(t => t.status === "In Progress");

      setCurrentQueue(pending);
      setServingToken(inProgress || null);
    } catch (err) {
      console.error("Error fetching queue:", err);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 10000);
    return () => clearInterval(interval);
  }, []);

  // 🔹 Update backend status
  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/queue/update/${id}`, { status });
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  // 🔹 CALL NEXT TOKEN
  const handleCallNext = async () => {
    skipNextFetch.current = true;

    if (servingToken) {
      await updateStatus(servingToken._id, "Completed");
      setTokensDone(prev => prev + 1);
    }

    const nextPerson = currentQueue[0];
    if (nextPerson) {
      await updateStatus(nextPerson._id, "In Progress");
      setServingToken(nextPerson);
      setCurrentQueue(prev => prev.slice(1));
    } else {
      setServingToken(null);
      if (!servingToken) setShowModal(true);
    }
  };

  // 🔹 MARK COMPLETED
  const handleMarkDone = async () => {
    if (!servingToken) return;
    skipNextFetch.current = true;

    // Optimistic UI update
    setServingToken(null);
    setTokensDone(prev => prev + 1);

    await updateStatus(servingToken._id, "Completed");
  };

  // 🔹 FETCH ACTIVE TOKENS ON PAGE LOAD
  useEffect(() => {
    const fetchActiveTokens = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/queue/list");
        // In Progress token
        const inProgress = res.data.find(t => t.status === "In Progress");
        setServingToken(inProgress || null);

        // Pending queue
        const pending = res.data.filter(t => t.status === "Pending");
        setCurrentQueue(pending);

        // Count completed tokens
        const doneCount = res.data.filter(t => t.status === "Completed").length;
        setTokensDone(doneCount);
      } catch (err) {
        console.error("Error fetching active tokens:", err);
      }
    };

    fetchActiveTokens();
  }, []);

  const pendingCount = currentQueue.length;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <Navbar />
      <div className="max-w-7xl mx-auto pt-32 pb-12 px-6">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
            <p className="text-white/40 text-xs font-bold uppercase">Served Session</p>
            <h2 className="text-4xl font-bold mt-2">{tokensDone}</h2>
          </div>

          <div className="p-6 rounded-3xl bg-purple-600/20 border border-purple-500/30 text-center">
            <p className="text-purple-400 text-xs font-bold uppercase">Currently Serving</p>
            <h2 className="text-4xl font-bold mt-2">{servingToken ? servingToken.tokenID : "---"}</h2>
          </div>

          <div className="p-6 rounded-3xl bg-white/5 border border-white/10 text-center">
            <p className="text-white/40 text-xs font-bold uppercase">Pending in Line</p>
            <h2 className="text-4xl font-bold mt-2">{pendingCount}</h2>
          </div>
        </div>

        {/* Terminal + Upcoming */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 p-10 rounded-[40px] bg-white/5 border border-white/10">
            <div className="flex justify-between mb-8">
              <h3 className="text-2xl font-bold">Counter Officer Terminal</h3>
              <span className={`px-4 py-1 rounded-full text-xs font-bold border ${
                servingToken
                  ? "bg-green-500/10 text-green-400 border-green-500/30"
                  : "bg-red-500/10 text-red-400 border-red-500/30"
              }`}>{servingToken ? "Counter Active" : "Waiting"}</span>
            </div>

            {servingToken ? (
              <div className="bg-white/5 rounded-3xl p-10 mb-8 text-center">
                <h1 className="text-5xl font-black">{servingToken.name}</h1>
                <p className="text-xl">{servingToken.tokenID}</p>
                <p className="text-purple-400 font-bold uppercase">{servingToken.service}</p>
              </div>
            ) : (
              <div className="bg-white/5 rounded-3xl p-10 mb-8 text-center text-white/20">No Active Citizen</div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <button onClick={handleCallNext} className="py-5 bg-white text-black font-black rounded-3xl hover:bg-gray-200 transition">CALL NEXT TOKEN</button>
              <button onClick={handleMarkDone} className="py-5 bg-purple-600 rounded-3xl font-bold hover:bg-purple-700 transition">MARK COMPLETED</button>
            </div>
          </div>

          <div className="p-8 rounded-[40px] bg-white/5 border border-white/10 max-h-[600px] overflow-y-auto">
            <h3 className="font-bold mb-6">Upcoming in Queue</h3>
            {currentQueue.map(user => (
              <div key={user._id} className="p-4 bg-white/5 rounded-2xl mb-3 border border-white/5">
                <p className="text-xs text-white/40">{user.tokenID}</p>
                <p className="font-bold">{user.name}</p>
              </div>
            ))}
            {currentQueue.length === 0 && <div className="text-center text-white/10 italic py-10">Queue Khali Hai</div>}
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
          <div className="bg-[#111] p-8 rounded-3xl text-center">
            <h2 className="text-2xl font-bold mb-3">Queue is Empty</h2>
            <button onClick={() => setShowModal(false)} className="px-6 py-2 bg-white text-black rounded-xl font-bold">OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
