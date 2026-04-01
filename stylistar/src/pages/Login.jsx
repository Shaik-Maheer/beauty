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
    <div className="flex items-center justify-center min-h-screen bg-pink-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-pink-700 text-center">
          Sign In
        </h2>

        {/* Error Banner */}
        {error && (
          <div
            role="alert"
            aria-live="assertive"
            className="mb-4 rounded border border-red-200 bg-red-50 p-3 text-red-700 text-sm text-center"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} noValidate>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
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
              className="w-full mt-1 p-2 border rounded focus:outline-pink-500"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Field with Show/Hide Toggle */}
          <div className="mb-2 relative">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full mt-1 p-2 border rounded pr-10 focus:outline-pink-500"
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3 top-9 text-gray-600 hover:text-pink-600"
              tabIndex={-1}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="text-right mb-4">
            <Link
              to="/forgot-password"
              className="text-sm text-pink-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white py-2 rounded ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-pink-600 hover:bg-pink-700"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <Link to="/register" className="text-pink-600 font-medium hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
