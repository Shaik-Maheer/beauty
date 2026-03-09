// // export const isAuthenticated = () => {
// //     const token = localStorage.getItem("token");
// //     return !!token;
// //   };
  



// // src/utils/isAuthenticated.js
// import { getToken, isTokenExpired, clearAuth } from "./auth";

// export const isAuthenticated = () => {
//   const token = getToken();
//   if (!token) return false;
//   if (isTokenExpired(token)) {
//     clearAuth();
//     return false;
//   }
//   return true;
// };

// export default isAuthenticated;



// src/utils/isAuthenticated.js
import { getToken, isTokenExpired, clearAuth } from "./auth";

export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  if (isTokenExpired(token)) {
    clearAuth();
    return false;
  }
  return true;
};

export default isAuthenticated;
