// import { useState } from "react";
// import axios from "axios";

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [msg, setMsg] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await axios.post("https://beauty-backend-psst.onrender.com/api/auth/forgot-password", { email });
//     setMsg(res.data.message);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-500">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-[350px]">
//         <h2 className="text-xl font-bold text-center mb-4">Forgot Password</h2>
//         <input
//           type="email"
//           placeholder="Your email address"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className="w-full p-2 mb-3 border rounded"
//         />
//         <button className="w-full bg-blue-600 text-white p-2 rounded">
//           Reset my Password
//         </button>
//         {msg && <p className="mt-4 text-sm text-green-600 text-center">{msg}</p>}
//       </form>
//     </div>
//   );
// };

// export default ForgotPassword;





import { useState } from "react";
import api from "../utils/axiosInstance"; // ✅ use centralized axios
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");
    setLoading(true);

    // Provide cold start feedback to the user after 5 seconds
    const coldStartTimer = setTimeout(() => {
      setMsg("Server is waking up (up to 50s). Please hold on...");
      setError("");
    }, 5000);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      clearTimeout(coldStartTimer);
      setMsg(res.data.message || "Password reset link sent to your email.");
      setEmail(""); // clear form on success
    } catch (err) {
      clearTimeout(coldStartTimer);
      setMsg(""); // Clear the waking up message
      
      let errMsg =
        err.response?.data?.message ||
        err.response?.data?.error;

      // Specifically handle Render's cold start timeout instead of generic error
      if (!errMsg && err.message && err.message.includes("timeout")) {
        errMsg = "The server took too long. Please click the button again.";
      } else if (!errMsg) {
        errMsg = err.message || "Something went wrong. Please check your connection and try again.";
      }
      
      setError(errMsg);
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
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[#f470a0] to-rose-400 rounded-2xl shadow-lg mb-4">
            <span className="text-3xl">🔑</span>
          </div>
          <h2 className="text-3xl font-black text-gray-900 tracking-tight">
            Forgot Password
          </h2>
          <p className="text-gray-500 mt-2 font-medium leading-relaxed">No worries! Enter your email and we'll send you a reset link.</p>
        </div>

        {/* Success + Error alerts */}
        {msg && (
          <div className="mb-6 rounded-2xl border border-green-100 bg-green-50/50 p-4 text-green-700 text-sm text-center font-semibold">
            {msg}
          </div>
        )}
        {error && (
          <div className="mb-6 rounded-2xl border border-red-100 bg-red-50/50 p-4 text-red-600 text-sm text-center font-semibold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-1.5">
            <label className="block text-sm font-bold text-gray-700 ml-1">
              Registered Email
            </label>
            <input
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-4 bg-white/50 border border-pink-100 rounded-2xl focus:ring-2 focus:ring-[#f470a0] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-lg shadow-lg transform active:scale-95 transition-all duration-200 ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#f470a0] via-pink-500 to-rose-400 hover:shadow-pink-200 hover:-translate-y-1"
            }`}
          >
            {loading ? "Sending Link..." : "Send Reset Link 📩"}
          </button>
        </form>

        <div className="mt-8 text-center border-t border-pink-100/30 pt-8">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-[#f470a0] transition-colors underline underline-offset-4"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
