

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { Eye, EyeOff } from "lucide-react"; // 👁️ For show/hide password

// const Register = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false); // 👁️
//   const [agree, setAgree] = useState(false); // ✅ Terms checkbox
//   const [error, setError] = useState("");

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await axios.post("https://beauty-backend-psst.onrender.com/api/auth/register", {
//         name,
//         email,
//         password,
//       });

//       if (res.data.token) {
//         localStorage.setItem("token", res.data.token);
//         navigate("/home");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message || "Registration failed. Try again."
//       );
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-pink-50">
//       <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-pink-700 text-center">
//           Create Account
//         </h2>

//         {error && (
//           <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
//         )}

//         <form onSubmit={handleRegister}>
//           {/* Full Name */}
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700">
//               Full Name
//             </label>
//             <input
//               type="text"
//               required
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full mt-1 p-2 border rounded focus:outline-pink-500"
//               placeholder="Your Name"
//             />
//           </div>

//           {/* Email */}
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

//           {/* Password with toggle */}
//           <div className="mb-4 relative">
//             <label className="block text-sm font-medium text-gray-700">
//               Password
//             </label>
//             <input
//               type={showPassword ? "text" : "password"}
//               required
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full mt-1 p-2 border rounded pr-10 focus:outline-pink-500"
//               placeholder="Create password"
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

//           {/* Terms & Conditions */}
//           <div className="mb-4 flex items-start gap-2 text-sm text-gray-700">
//             <input
//               type="checkbox"
//               checked={agree}
//               onChange={(e) => setAgree(e.target.checked)}
//               className="mt-1"
//               required
//             />
//             <span>
//               I agree to the{" "}
//               <Link to="/terms" className="text-pink-600 underline">
//                 Terms of Service
//               </Link>{" "}
//               and{" "}
//               <Link to="/privacy" className="text-pink-600 underline">
//                 Privacy Policy
//               </Link>
//               .
//             </span>
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             disabled={!agree}
//             className={`w-full py-2 rounded text-white ${
//               agree
//                 ? "bg-pink-600 hover:bg-pink-700"
//                 : "bg-gray-400 cursor-not-allowed"
//             }`}
//           >
//             Register
//           </button>
//         </form>

//         <p className="mt-4 text-sm text-center text-gray-600">
//           Already have an account?{" "}
//           <Link to="/login" className="text-pink-600 font-medium hover:underline">
//             Login
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Register;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { Eye, EyeOff } from "lucide-react";

const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agree, setAgree] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const res = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Some backends return only a message, some return token.
      // Your requirement: don't auto-login; ask user to log in.
      if (res.status >= 200 && res.status < 300) {
        setSuccess("Registration successful! Please log in.");
        // clear form
        setName("");
        setEmail("");
        setPassword("");
        setAgree(false);
        e.target.reset?.();

        // redirect after a short pause so user can read the alert
        setTimeout(() => navigate("/login"), 1200);
      } else {
        throw new Error("Registration failed. Try again.");
      }
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        "Registration failed. Try again.";
      setError(msg);
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
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Create Account
          </h2>
          <p className="text-gray-500 mt-2 font-medium">Join our beauty community today</p>
        </div>

        {/* Alerts */}
        {success && (
          <div
            role="status"
            aria-live="polite"
            className="mb-6 rounded-2xl border border-green-100 bg-green-50/50 p-4 text-green-700 text-sm text-center font-semibold"
          >
            {success}
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="mb-6 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-red-600 text-sm text-center font-semibold"
          >
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} noValidate className="space-y-5">
          {/* Full Name */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Full Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-5 py-3.5 bg-white/50 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-[#f470a0] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="Your Name"
            />
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Email Address
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3.5 bg-white/50 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-[#f470a0] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              placeholder="name@example.com"
            />
          </div>

          {/* Password */}
          <div className="space-y-1.5 relative">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Create Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-3.5 bg-white/50 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-[#f470a0] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
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

          {/* Terms & Conditions */}
          <div className="flex items-start gap-3 py-2 px-1">
            <input
              id="agree"
              type="checkbox"
              checked={agree}
              onChange={(e) => setAgree(e.target.checked)}
              className="mt-1 w-5 h-5 rounded-md border-pink-200 text-[#f470a0] focus:ring-[#f470a0] cursor-pointer accent-[#f470a0]"
              required
            />
            <label htmlFor="agree" className="text-xs text-gray-600 leading-relaxed font-medium">
              I agree to the{" "}
              <Link to="/terms" className="text-[#f470a0] font-bold hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="text-[#f470a0] font-bold hover:underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={!agree || loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transform active:scale-95 transition-all duration-200 ${
              !agree || loading
                ? "bg-gray-300 cursor-not-allowed"
                : "bg-gradient-to-r from-[#f470a0] via-pink-500 to-rose-400 hover:shadow-pink-200 hover:-translate-y-1"
            }`}
          >
            {loading ? "Creating Account..." : "Join Now ✨"}
          </button>
        </form>

        <p className="mt-8 text-sm text-center text-gray-600 font-medium">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-[#f470a0] font-black hover:underline underline-offset-4"
          >
            Login Here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
