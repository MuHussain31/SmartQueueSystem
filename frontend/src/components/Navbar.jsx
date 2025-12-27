import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom"; 

export default function Navbar() {
  const location = useLocation(); 
  const navigate = useNavigate();
  const [currentPath, setCurrentPath] = useState("/");

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  const isLoginPage = currentPath === "/login" || currentPath === "/admin";
  // Dashboard aur Book pages ko group kar diya
  const isProtectedArea = currentPath === "/dashboard" || currentPath === "/admin-dashboard" || currentPath === "/book";

  return (
    <nav className="w-full absolute top-0 left-0 z-50 bg-transparent px-6 py-5 flex items-center justify-between">
      <div className="flex items-center lg:ml-10">
        <h1 className="text-white text-xl font-bold tracking-wide cursor-pointer" onClick={() => navigate("/")}>
          SMS
        </h1>
      </div>

      {!isProtectedArea && (
        <div className="hidden md:flex items-center justify-center space-x-2 flex-1">
          <NavItem href="/" currentPath={currentPath}>Home</NavItem>
          <NavItem href="/about" currentPath={currentPath}>Our Team</NavItem>
          <NavItem href="/services" currentPath={currentPath}>Services</NavItem>
          <NavItem href="/contact" currentPath={currentPath}>Contact</NavItem>
        </div>
      )}

      <div className="flex items-center lg:mr-10 min-w-[100px] justify-end">
        {isProtectedArea ? (
          <button 
            onClick={() => navigate("/")}
            className="bg-red-500/20 text-red-400 border border-red-500/40 text-sm font-bold px-7 py-2 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300 shadow-lg"
          >
            Logout
          </button>
        ) : (
          !isLoginPage && (
            <Link to="/login" className="bg-white text-black text-sm font-bold px-7 py-2 rounded-full shadow-lg hover:scale-105 transition-all">
              Login
            </Link>
          )
        )}
      </div>
    </nav>
  );
}

function NavItem({ href, children, currentPath }) {
  const isActive = currentPath === href;
  return (
    <Link to={href} className={`text-white text-sm lg:text-base font-medium px-5 py-2 rounded-full transition-all hover:bg-white/10 ${isActive ? "border border-white bg-white/10" : "border border-transparent"}`}>
      {children}
    </Link>
  );
}