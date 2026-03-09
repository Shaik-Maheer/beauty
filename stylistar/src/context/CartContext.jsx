// import { createContext, useContext, useState, useEffect } from "react";
// import axiosInstance from "../utils/axiosInstance";
// import { CartProvider, useCart } from "../context/CartContext";

// const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const fetchCart = async () => {
//     try {
//       const res = await axiosInstance.get("/cart");
//       setCart(res.data);
//     } catch (err) {
//       console.error("Error fetching cart", err);
//     }
//   };

//   useEffect(() => {
//     fetchCart();
//   }, []);

//   return (
//     <CartContext.Provider value={{ cart, setCart, fetchCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => useContext(CartContext);


// src/context/CartContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Optional: Fetch cart from backend/localStorage
  const fetchCart = async () => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <CartContext.Provider value={{ cart, setCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
