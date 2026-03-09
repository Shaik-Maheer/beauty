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
    <div className="w-full max-w-[270px] h-[460px] bg-white rounded-2xl shadow-md p-3 relative flex flex-col justify-between transition hover:shadow-lg hover:scale-[1.04]">
      {isOnSale && (
        <span className="absolute top-2 left-2 bg-yellow-400 text-[10px] font-semibold px-2 py-[2px] rounded-full animate-pulse">
          SALE
        </span>
      )}

      <button
        disabled={loading}
        className="absolute top-2 right-2 text-[20px] p-1 rounded-full bg-white/80 backdrop-blur-sm shadow hover:scale-110 transition"
        onClick={handleWishlistToggle}
      >
        {isWishlisted ? (
          <FaHeart className="text-red-500" />
        ) : (
          <FaRegHeart className="text-gray-400 hover:text-pink-500" />
        )}
      </button>

      <div className="w-full h-[210px] flex justify-center items-center overflow-hidden mb-3 bg-white">
        <img
          src={product?.image_link || product?.image}
          alt={product?.name}
          className="max-h-[200px] w-auto object-contain transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-[16px] font-semibold text-gray-800 mb-1 leading-snug line-clamp-2 group-hover:text-pink-600 transition">
          {product?.name}
        </h3>
        <p className="text-[13px] text-gray-500 capitalize mb-1">
          {product?.brand}
        </p>
        <div className="flex items-center gap-[2px] mb-1">
          {Array.from({ length: 5 }).map((_, i) =>
            i < rating ? (
              <FaStar key={i} className="text-yellow-400 text-[14px]" />
            ) : (
              <FaRegStar key={i} className="text-gray-300 text-[14px]" />
            )
          )}
        </div>
        <p className="text-[16px] text-pink-600 font-bold">₹ {priceINR}</p>
      </div>

      <div className="flex justify-between mt-3">
        <Link to={`/product/${productId}`}>
          <button className="bg-pink-600 text-white text-[13px] px-3 py-[6px] rounded-lg hover:bg-pink-700 shadow-md hover:shadow-lg transition">
            View
          </button>
        </Link>
        <button
          className="bg-pink-100 text-pink-700 text-[13px] px-3 py-[6px] rounded-lg hover:bg-pink-200 shadow-sm hover:shadow-md transition"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
