import { Link, useLocation, useNavigate } from "react-router-dom";

export default function UserSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;

  const handleLogout = () => {
    // Data clear karo
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("myToken");
    navigate("/login");
  };

  const menuItems = [
    { name: "Live Dashboard", path: "/dashboard", icon: "📊" },
    { name: "Book New Slot", path: "/book", icon: "bm" }, // bm = bookmark icon logic (using emoji for now)
    { name: "My History", path: "/history", icon: "Qs" }, // Naya Idea (History)
    { name: "Profile Settings", path: "/profile", icon: "⚙️" }, // Naya Idea (Profile)
  ];

  return (
    <div className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white/5 backdrop-blur-xl border-r border-white/10 p-6 z-50">
      
      {/* Logo Area */}
      <div className="mb-10 flex items-center gap-3 cursor-pointer" onClick={() => navigate("/")}>
        <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center font-bold text-white">Q</div>
        <h1 className="text-white text-xl font-bold tracking-wide">QueueMS</h1>
      </div>

      {/* Menu Links */}
      <div className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <Link 
            key={item.path} 
            to={item.path}
            className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
              currentPath === item.path 
              ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30" 
              : "text-white/60 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </div>

      {/* User Profile & Logout */}
      <div className="border-t border-white/10 pt-6">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all"
        >
          <span>🚪</span>
          <span className="font-bold text-sm">Logout Account</span>
        </button>
      </div>
    </div>
  );
}