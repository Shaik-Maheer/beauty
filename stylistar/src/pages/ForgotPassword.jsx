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

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setMsg(res.data.message || "Password reset link sent to your email.");
      setEmail(""); // clear form on success
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong. Please try again.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow w-[350px]"
      >
        <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">
          Forgot Password
        </h2>

        {/* Success + Error alerts */}
        {msg && (
          <div className="mb-4 text-sm text-green-700 bg-green-50 border border-green-200 rounded p-2 text-center">
            {msg}
          </div>
        )}
        {error && (
          <div className="mb-4 text-sm text-red-700 bg-red-50 border border-red-200 rounded p-2 text-center">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-3 border rounded focus:outline-pink-500"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Sending..." : "Reset my Password"}
        </button>

        <div className="mt-6 text-center border-t border-gray-100 pt-6">
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-400 underline hover:text-pink-600 transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            Back to Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;
