import { useEffect, useState } from "react";
import UserSidebar from "../components/UserSidebar";
import axios from "axios";

export default function ProfileSetting() {

  // 🔹 User from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  // 🔹 Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // 🔹 Page load / user change par default data fill
  useEffect(() => {
    if (user?.name || user?.email) {
      setFormData({
        name: user.name ?? "",
        email: user.email ?? "",
        password: ""
      });
    }
  }, [user]);

  // 🔹 Name se initials
  const getInitials = (name = "") => {
    const words = name.trim().split(" ");
    if (!words[0]) return "?";
    if (words.length === 1) return words[0][0].toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  };

  // 🔹 Update profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess("");
    setError("");

    try {
      // ✅ password blank ho to backend ko mat bhejo
      const payload = {
        name: formData.name
      };

      if (formData.password.trim()) {
        payload.password = formData.password;
      }

      const res = await axios.put(
        "http://localhost:5000/api/user/update",
        payload
      );

      // ✅ localStorage update
      localStorage.setItem("user", JSON.stringify(res.data.user));

      setFormData({
        name: res.data.user.name,
        email: res.data.user.email,
        password: ""
      });

      setSuccess("Profile updated successfully ✅");
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#0a0a0a] overflow-hidden">

      {/* SIDEBAR */}
      <UserSidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 md:ml-64 min-h-screen bg-gradient-to-br from-[#000000] via-[#1a051f] to-[#2e0b36] px-6 py-12">

        <h1 className="text-white text-3xl md:text-4xl font-bold mb-10">
          Profile <span className="text-purple-400">Settings</span>
        </h1>

        <div className="max-w-xl p-8 rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl">

          {/* AVATAR */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-black text-2xl font-bold">
              {getInitials(formData.name)}
            </div>

            <div>
              <p className="text-white text-lg font-semibold">
                {formData.name || "Your Name"}
              </p>
              <p className="text-white/40 text-sm">
                {formData.email}
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleUpdate} className="space-y-6">

            {/* NAME */}
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] font-bold uppercase ml-4">
                Full Name
              </label>
              <input
                type="text"
                required
                value={formData.name}
                placeholder={user?.name || "Enter your full name"}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 transition-all"
              />
            </div>

            {/* EMAIL */}
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] font-bold uppercase ml-4">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                disabled
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white/60 cursor-not-allowed"
              />
            </div>

            {/* PASSWORD */}
            <div className="space-y-2">
              <label className="text-white/40 text-[10px] font-bold uppercase ml-4">
                New Password
              </label>
              <input
                type="password"
                placeholder="Leave blank to keep current password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white outline-none focus:border-purple-500 transition-all"
              />
            </div>

            {/* MESSAGES */}
            {success && (
              <p className="text-green-400 text-sm font-semibold">
                {success}
              </p>
            )}
            {error && (
              <p className="text-red-400 text-sm font-semibold">
                {error}
              </p>
            )}

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 bg-white text-black font-bold rounded-2xl transition-all
                ${loading ? "opacity-50" : "hover:scale-[1.01] hover:shadow-lg"}`}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
