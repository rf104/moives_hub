import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Login() {
  const [mode, setMode] = useState("login"); // "login" | "register"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (mode === "register") {
        if (!name.trim()) { setError("Name is required"); setLoading(false); return; }
        register(name.trim(), email.trim(), password);
      } else {
        login(email.trim(), password);
      }
      navigate("/home");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] flex items-center justify-center px-4">

      {/* Background cinematic glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px]
          bg-red-700/20 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎬</div>
          <h1 className="text-3xl font-black text-white">
            Movie<span className="text-red-500">Hub</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Your personal movie universe</p>
        </div>

        {/* Card */}
        <div className="bg-[#1c1c1c] rounded-2xl p-8 shadow-2xl border border-white/5">

          {/* Tab Toggle */}
          <div className="flex rounded-xl overflow-hidden bg-[#141414] mb-6 p-1">
            {["login", "register"].map((tab) => (
              <button
                key={tab}
                onClick={() => { setMode(tab); setError(""); }}
                className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all capitalize
                  ${mode === tab
                    ? "bg-red-600 text-white shadow"
                    : "text-gray-400 hover:text-white"
                  }`}
              >
                {tab === "login" ? "Sign In" : "Register"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "register" && (
              <div>
                <label className="block text-gray-400 text-xs font-medium mb-1.5">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  required
                  className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10
                    text-white placeholder-gray-600 text-sm
                    focus:outline-none focus:border-red-500 transition-colors"
                />
              </div>
            )}

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10
                  text-white placeholder-gray-600 text-sm
                  focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-gray-400 text-xs font-medium mb-1.5">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10
                  text-white placeholder-gray-600 text-sm
                  focus:outline-none focus:border-red-500 transition-colors"
              />
            </div>

            {error && (
              <div className="px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold
                text-sm transition-all hover:shadow-lg hover:shadow-red-700/30
                disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? "Please wait..."
                : mode === "login" ? "Sign In" : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-xs mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => { setMode(mode === "login" ? "register" : "login"); setError(""); }}
              className="text-red-400 hover:text-red-300 font-medium"
            >
              {mode === "login" ? "Register" : "Sign In"}
            </button>
          </p>
        </div>

        <p className="text-center text-gray-700 text-xs mt-6">
          Data is stored locally in your browser
        </p>
      </div>
    </div>
  );
}

export default Login;
