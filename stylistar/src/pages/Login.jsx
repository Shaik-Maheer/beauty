// import { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { isAuthenticated } from "../utils/isAuthenticated";
// import { Eye, EyeOff } from "lucide-react"; // ✅ Install lucide-react if not added

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👁️
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (isAuthenticated()) {
//       navigate("/home");
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("https://beauty-backend-psst.onrender.com/api/auth/login", {
//         email,
//         password,
//       });

//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         navigate("/home");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Login failed. Please try again."
//       );
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-pink-50">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-pink-700 text-center">
//           Sign In
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
//         )}

//         <form onSubmit={handleLogin}>
//           {/* Email Field */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Email
//             </label>
//             <input
//               type="email"
//               required
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full mt-1 p-2 border rounded focus:outline-pink-500"
//               placeholder="you@example.com"
//             />
//           </div>

//           {/* Password Field with Show/Hide Toggle */}
//           <div className="mb-2 relative">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full mt-1 p-2 border rounded pr-10 focus:outline-pink-500"
//               placeholder="••••••••"
//             />
//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-9 text-gray-600 hover:text-pink-600"
//               tabIndex={-1}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>

//           <div className="text-right mb-4">
//             <Link
//               to="/forgot-password"
//               className="text-sm text-pink-600 hover:underline"
//             >
//               Forgot Password?
//             </Link>
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-600">
//           Don’t have an account?{" "}
//           <Link
//             to="/register"
//             className="text-pink-600 font-medium hover:underline"
//           >
//             Register
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;





import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../utils/axiosInstance";
import { isAuthenticated } from "../utils/isAuthenticated";
import { saveUser } from "../utils/auth";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated()) {
      navigate("/home");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return; // guard
    setError("");
    setLoading(true);

    // Provide cold start feedback to the user after 5 seconds
    const coldStartTimer = setTimeout(() => {
      setError("Server is waking up (this can take up to 50 seconds on a free server). Please hold on...");
    }, 5000);

    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      clearTimeout(coldStartTimer); // Clear the cold start message on success

      if (res.data?.token) {
        saveUser(res.data.user, res.data.token);
        // optional: clear password field to avoid lingering sensitive data
        setPassword("");
        navigate("/home");
      } else {
        throw new Error("Invalid response from server.");
      }
    } catch (err) {
      clearTimeout(coldStartTimer); // Clear it if it errors quickly
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Login failed. Please try again.";
      
      // Give a specific error if it hits the 60s timeout
      if (err.message && err.message.includes('timeout')) {
        setError("The server took too long to wake up. Please click Login again.");
      } else {
        setError(msg);
      }
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fff0f5] via-[#ffe4e6] to-[#faf2f2] relative overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-pink-200 opacity-40 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-300 opacity-30 rounded-full blur-[120px] animate-pulse delay-700"></div>

      <div 
        className="bg-white/70 backdrop-blur-xl p-10 rounded-[2.5rem] shadow-2xl w-full max-w-md border border-white/50 relative z-10"
        data-aos="zoom-in"
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#f470a0] to-rose-400 rounded-2xl shadow-lg mb-4 transform hover:rotate-12 transition-transform duration-300">
            <span className="text-3xl">✨</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Welcome Back
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Please sign in to your Stylistar account</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-6 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-red-600 text-sm text-center font-semibold"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate className="space-y-6">
          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              autoFocus
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white/50 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-[#f470a0] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="name@example.com"
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2 relative">
            <div className="flex justify-between items-center ml-1">
              <label htmlFor="password" className="text-sm font-bold text-gray-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[#f470a0] hover:text-rose-600 transition"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-white/50 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-[#f470a0] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#f470a0] transition"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transform active:scale-95 transition-all duration-200 ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#f470a0] via-pink-500 to-rose-400 hover:shadow-pink-200 hover:-translate-y-1"
            }`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : "Sign In ✨"}
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-600 font-medium">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#f470a0] font-black hover:underline underline-offset-4 ring-offset-2">
            Create Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
