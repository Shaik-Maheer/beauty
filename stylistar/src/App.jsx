




















import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import AOS from "aos";
import "aos/dist/aos.css";

// Pages
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProfilePage from "./pages/ProfilePage";
import Blog from "./pages/Blog";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import TermsAndPrivacy from "./pages/TermsAndPrivacy";
import About from "./pages/About";
import Services from "./pages/Services";

// Components
import BottomNav from "./components/BottomNav";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";

// Utils
import { isLoggedIn } from "./utils/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LayoutWrapper = () => {
  const location = useLocation();

  // init AOS once
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // routes where we hide BottomNav/Footer
  const noNavExact = ["/", "/login", "/register", "/forgot-password", "/terms", "/privacy", "/profile", "/orders"];
  const hideChrome =
    noNavExact.includes(location.pathname) ||
    location.pathname.startsWith("/reset-password");

  return (
    <>
      <div className={hideChrome ? "" : "pb-[110px] md:pb-0"}>
        <Routes>
          {/* Root route redirects to home if logged in, else login */}
          <Route
            path="/"
            element={isLoggedIn() ? <Navigate to="/home" /> : <Login />}
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/terms" element={<TermsAndPrivacy />} />
          <Route path="/privacy" element={<TermsAndPrivacy />} />

          {/* Protected Routes */}
          <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/shop" element={<PrivateRoute><Shop /></PrivateRoute>} />
          <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
          <Route path="/wishlist" element={<PrivateRoute><Wishlist /></PrivateRoute>} />
          <Route path="/product/:id" element={<PrivateRoute><ProductDetails /></PrivateRoute>} />
          <Route path="/blog" element={<PrivateRoute><Blog /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
          <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
          <Route path="/orders" element={<PrivateRoute><MyOrders /></PrivateRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
        </Routes>
      </div>

      {/* Conditional BottomNav and Footer */}
      {!hideChrome && <BottomNav />}
      {!hideChrome && <Footer />}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop />
    </>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
