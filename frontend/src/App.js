import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public Pages
import Home from "./pages/Home";
import Team from "./pages/Team"; 
import Services from "./pages/Services"; 
import Contact from "./pages/Contact"; 
import Pricing from "./pages/Pricing";

// Auth
import LoginRegister from "./pages/LoginRegister"; 

// User Pages
import UserDashboard from "./pages/User"; 
import BookSlot from "./pages/Book"; 
import MyHistory from "./pages/MyHistory";
import ProfileSetting from "./pages/ProfileSetting"; // ✅ NAYA IMPORT

// Admin Pages
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  return (
    <Router>
      <Routes>

        {/* ===== Public Routes ===== */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<Team />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<LoginRegister />} />

        {/* ===== Admin Routes ===== */}
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />

        {/* ===== User Routes ===== */}
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/book" element={<BookSlot />} />
        <Route path="/history" element={<MyHistory />} />
        <Route path="/profile" element={<ProfileSetting />} /> {/* ✅ PROFILE */}

      </Routes>
    </Router>
  );
}
