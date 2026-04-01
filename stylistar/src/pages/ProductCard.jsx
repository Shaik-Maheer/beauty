import { useState } from "react";
import { FaHeart, FaRegHeart, FaStar, FaRegStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";
import { isLoggedIn } from "../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductCard = ({ product }) => {
  const productId = product?.id || product?.product_id;
  const isOnSale = Number.parseFloat(product?.price) < 5;
  const priceINR = Math.round((Number.parseFloat(product?.price) || 0) * 80 || 499);
  const rating = product?.rating || Math.floor(Math.random() * 3) + 3;

  const [loading, setLoading] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistToggle = async () => {
    if (!isLoggedIn()) {
      toast.warning("Please log in to use wishlist. 💖");
      return;
    }

    setLoading(true);
    try {
      if (!isWishlisted) {
        await axiosInstance.post("/wishlist", {
          productId,
          name: product?.name,
          image: product?.image_link || product?.image,
          price: product?.price,
        });
        setIsWishlisted(true);
        toast.success("Added to wishlist 💖");
      } else {
        await axiosInstance.delete(`/wishlist/${productId}`);
        setIsWishlisted(false);
        toast.info("Removed from wishlist");
      }
    } catch (err) {
      console.error("Wishlist error:", err?.response?.data || err?.message);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      toast.warning("Please log in to add to cart. 🛒");
      return;
    }
    try {
      await axiosInstance.post("/cart/add", {
        productId,
        name: product?.name,
        image: product?.image_link || product?.image,
        price: priceINR,
        quantity: 1,
      });
      toast.success("Product added to cart successfully 🛒");
    } catch (err) {
      console.error("Cart error:", err?.response?.data || err?.message);
      toast.error("Something went wrong adding to cart.");
    }
  };

  return (
    <Link to={`/product/${productId}`} className="group relative w-full bg-white rounded-3xl shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)] border border-pink-50 p-4 pb-5 flex flex-col justify-between transition-all duration-300 hover:shadow-[0_8px_30px_-5px_rgba(219,39,119,0.15)] hover:border-pink-200 overflow-hidden cursor-pointer block">
      
      {/* Sale Badge */}
      {isOnSale && (
        <span className="absolute top-4 left-4 z-10 bg-gradient-to-r from-pink-600 to-rose-400 text-white text-[10px] sm:text-xs font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm animate-pulse block">
          Sale
        </span>
      )}

      {/* Wishlist Button */}
      <button
        disabled={loading}
        className="absolute top-4 right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-white/90 backdrop-blur-sm shadow-sm border border-pink-50 hover:scale-110 active:scale-95 transition-all outline-none"
        onClick={(e) => {
           e.preventDefault(); 
           e.stopPropagation(); 
           handleWishlistToggle(e);
        }}
      >
        {isWishlisted ? (
          <FaHeart className="text-pink-600 animate-[bounce_0.3s_ease]" size={16} />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-pink-600 transition" size={16} />
        )}
      </button>

      {/* Product Image Wrapper */}
      <div className="w-full aspect-square sm:aspect-[4/5] bg-gradient-to-b from-gray-50/50 to-white rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden group-hover:bg-pink-50/30 transition-colors duration-500">
        <img
          src={product?.image_link || product?.image}
          alt={product?.name}
          className="w-full h-full object-contain p-4 mix-blend-multiply transition-transform duration-[600ms] ease-out group-hover:scale-110"
          loading="lazy"
        />
      </div>

      {/* Details */}
      <div className="flex flex-col flex-1 px-1">
        <p className="text-[10px] sm:text-[11px] text-pink-600 uppercase tracking-widest font-extrabold mb-1 truncate">
          {product?.brand || "Stylistar Exclusive"}
        </p>
        <h3 className="text-sm sm:text-base font-bold text-gray-900 line-clamp-2 leading-snug group-hover:text-pink-600 transition-colors duration-200">
          {product?.name}
        </h3>
        
        <div className="mt-2.5 flex items-center gap-[2px]">
          {Array.from({ length: 5 }).map((_, i) =>
            i < rating ? (
              <FaStar key={i} className="text-yellow-400 text-[10px] sm:text-xs" />
            ) : (
              <FaRegStar key={i} className="text-gray-300 text-[10px] sm:text-xs" />
            )
          )}
          <span className="ml-1.5 text-[10px] sm:text-[11px] text-gray-400 font-semibold tracking-wide">({Math.floor(Math.random()*400)+50})</span>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <p className="text-lg sm:text-xl font-extrabold text-gray-900 tracking-tight">₹{priceINR}</p>
        </div>
      </div>

      {/* Add To Bag Button */}
      <button
        onClick={(e) => {
           e.preventDefault(); 
           e.stopPropagation();
           handleAddToCart(e);
        }}
        className="mt-5 w-full bg-pink-50 text-pink-700 border border-transparent font-extrabold py-3 sm:py-3.5 rounded-2xl text-[13px] sm:text-sm transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-pink-600 group-hover:to-rose-500 group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(219,39,119,0.3)] active:scale-95"
      >
        Add to Bag
      </button>
    </Link>
  );
};

export default ProductCard;
