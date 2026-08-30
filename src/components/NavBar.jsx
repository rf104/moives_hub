import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function NavBar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  const initial = user?.name?.charAt(0)?.toUpperCase() || "U";

  return (
    <nav className="sticky top-0 z-40 w-full bg-[#141414]/90 backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

        {/* Logo */}
        <Link
          to="/home"
          className="flex items-center gap-2 text-xl font-black tracking-tight"
        >
          <span className="text-2xl">🎬</span>
          <span className="text-white">Movie</span>
          <span className="text-red-500">Hub</span>
        </Link>

        {/* Nav Links */}
        <div className="flex items-center gap-1">
          <Link
            to="/home"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive("/home")
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            Home
          </Link>
          <Link
            to="/favt"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
              ${isActive("/favt")
                ? "bg-red-600 text-white"
                : "text-gray-400 hover:text-white hover:bg-white/5"
              }`}
          >
            ❤️ Favourites
          </Link>
        </div>

        {/* User section */}
        {user && (
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center
                text-white text-sm font-bold select-none">
                {initial}
              </div>
              <span className="text-gray-300 text-sm hidden sm:block">{user.name}</span>
            </div>
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-medium text-gray-400 hover:text-white
                border border-white/10 hover:border-red-500 rounded-lg transition-all"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default NavBar;