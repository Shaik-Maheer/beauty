// export const saveUser = (user, token) => {
//     localStorage.setItem("user", JSON.stringify(user));
//     localStorage.setItem("token", token);
//   };
  
//   export const getUser = () => JSON.parse(localStorage.getItem("user"));
//   export const getToken = () => localStorage.getItem("token");
  
//   export const logout = () => {
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   };
  
//   export const isLoggedIn = () => !!getToken();
  



// src/utils/auth.js

// Keep keys consistent everywhere
export const USER_KEY = "user";
export const TOKEN_KEY = "token";

export const saveUser = (user, token) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(TOKEN_KEY, token);
};

export const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY));
  } catch {
    return null;
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const logout = () => {
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem(TOKEN_KEY);
};

export const isLoggedIn = () => !!getToken();

/**
 * Safely parse a JWT payload. If token is not a JWT, returns null.
 */
const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    if (!base64Url) return null;
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(json);
  } catch {
    return null;
  }
};

/**
 * Returns true if JWT has an `exp` and is past that time.
 * If token is not a JWT or has no exp, we treat it as NOT expired.
 */
export const isTokenExpired = (token) => {
  const payload = parseJwt(token);
  if (!payload || !payload.exp) return false;
  return Date.now() >= payload.exp * 1000;
};

// Provide the alias your other file expects
export const clearAuth = logout;
