// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: "http://localhost:5000/api",
// });

// axiosInstance.interceptors.request.use((config) => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`; // ✅ Must be exactly like this
//   }
//   return config;
// });

// export default axiosInstance;



// src/utils/axiosInstance.js
import axios from "axios";
import { getToken, logout } from "./auth";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

// If your backend mounts APIs under /api, keep `/api` here:
const api = axios.create({
  baseURL: `${API_BASE}/api`,
  timeout: 12000,
  headers: { Accept: "application/json" },
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401/403 globally → clear and kick to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    const status = error?.response?.status;
    if (status === 401 || status === 403) {
      logout();
      // avoid redirect loops on login/register pages
      const here = window.location.pathname;
      if (here !== "/login" && here !== "/register") {
        const next = encodeURIComponent(here);
        window.location.href = `/login?next=${next}`;
      }
    }
    return Promise.reject(error);
  }
);

export default api;
