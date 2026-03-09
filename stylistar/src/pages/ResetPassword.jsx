// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import axios from "axios";

// const ResetPassword = () => {
//   const { token } = useParams();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [msg, setMsg] = useState("");

//   const validatePassword = (password) => {
//     const regex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     return regex.test(password);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (newPassword !== confirmPassword) {
//       setMsg("❌ Passwords do not match");
//       return;
//     }

//     if (!validatePassword(newPassword)) {
//       setMsg(
//         "❌ Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."
//       );
//       return;
//     }

//     try {
//       const res = await axios.post(`http://localhost:5000/api/auth/reset-password/${token}`, {
//         email,
//         newPassword,
//       });
//       setMsg("✅ " + res.data.message);
//       setTimeout(() => navigate("/login"), 3000);
//     } catch (err) {
//       setMsg("❌ Error resetting password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-blue-200">
//       <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-[400px]">
//         <h2 className="text-xl font-bold text-center mb-4">Reset Your Password</h2>

//         <input
//           type="email"
//           placeholder="Your Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//           className="w-full p-2 mb-3 border rounded"
//         />

//         <input
//           type="password"
//           placeholder="New Password"
//           value={newPassword}
//           onChange={(e) => setNewPassword(e.target.value)}
//           required
//           className="w-full p-2 mb-3 border rounded"
//         />

//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           required
//           className="w-full p-2 mb-3 border rounded"
//         />

//         <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded">
//           Submit
//         </button>

//         {msg && <p className="mt-4 text-center text-sm text-red-600">{msg}</p>}
//       </form>
//     </div>
//   );
// };

// export default ResetPassword;













import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../utils/axiosInstance";
import { Eye, EyeOff } from "lucide-react";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [msg, setMsg] = useState("");     // success message
  const [error, setError] = useState(""); // error message
  const [loading, setLoading] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const validatePassword = (password) => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!validatePassword(newPassword)) {
      setError(
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character."
      );
      return;
    }

    try {
      setLoading(true);
      const res = await api.post(`/auth/reset-password/${token}`, {
        email,
        newPassword,
      });
      setMsg(res.data?.message || "Password updated successfully.");
      // clear fields
      setEmail("");
      setNewPassword("");
      setConfirmPassword("");
      // go to login after a short pause
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      const errMsg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        "Error resetting password. Your link may be invalid or expired.";
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  // token guard (optional)
  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-pink-50">
        <div className="bg-white p-6 rounded-xl shadow w-[400px] text-center">
          <p className="text-red-600">
            Invalid reset link. Please request a new password reset.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow w-[400px]">
        <h2 className="text-2xl font-bold text-pink-700 text-center mb-6">
          Reset Your Password
        </h2>

        {/* Alerts */}
        {msg && (
          <div
            role="status"
            aria-live="polite"
            className="mb-4 rounded border border-green-200 bg-green-50 p-2 text-green-700 text-sm text-center"
          >
            {msg}
          </div>
        )}
        {error && (
          <div
            role="alert"
            className="mb-4 rounded border border-red-200 bg-red-50 p-2 text-red-700 text-sm text-center"
          >
            {error}
          </div>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 mb-3 border rounded focus:outline-pink-500"
        />

        {/* New Password */}
        <div className="mb-3 relative">
          <input
            type={showNew ? "text" : "password"}
            placeholder="New Password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 pr-10 border rounded focus:outline-pink-500"
          />
          <button
            type="button"
            onClick={() => setShowNew((s) => !s)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-pink-600"
            tabIndex={-1}
            aria-label={showNew ? "Hide password" : "Show password"}
          >
            {showNew ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        {/* Confirm Password */}
        <div className="mb-4 relative">
          <input
            type={showConfirm ? "text" : "password"}
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-2 pr-10 border rounded focus:outline-pink-500"
          />
          <button
            type="button"
            onClick={() => setShowConfirm((s) => !s)}
            className="absolute right-3 top-2.5 text-gray-600 hover:text-pink-600"
            tabIndex={-1}
            aria-label={showConfirm ? "Hide password" : "Show password"}
          >
            {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-pink-600 hover:bg-pink-700"
          }`}
        >
          {loading ? "Updating..." : "Submit"}
        </button>

        {/* Password hint */}
        <p className="text-xs text-gray-500 mt-3">
          Use at least 8 characters with uppercase, lowercase, number, and a special character.
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
