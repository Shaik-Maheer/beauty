import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { isLoggedIn } from "../utils/auth";
import { useCart } from "../context/CartContext"; 
import { toast } from "react-toastify";
import { Trash2, ShoppingCart, Heart, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { fetchCart } = useCart();
  const navigate = useNavigate();
  const wishlistAuthQuery = new URLSearchParams({
    next: "/wishlist",
    source: "wishlist",
  }).toString();

  const fetchWishlist = async () => {
    try {
      const res = await axiosInstance.get("/wishlist");
      setWishlist(res.data);
    } catch {
      toast.error("Error fetching wishlist");
    }
  };

  const removeFromWishlist = async (id) => {
    try {
      const removedItem = wishlist.find((it) => it._id === id);
      await axiosInstance.delete(`/wishlist/${id}`);
      setWishlist((prev) => prev.filter((item) => item._id !== id));

      // Sync heart state
      const u = JSON.parse(localStorage.getItem("user") || "null");
      const userId = u?.id || u?._id || u?.email || "anon";
      const WL_KEY = `wl:${userId}`;
      const raw = localStorage.getItem(WL_KEY);
      const set = new Set(raw ? JSON.parse(raw) : []);

      const pid = String(
        removedItem?.productId ??
          removedItem?.product_id ??
          removedItem?.id ??
          removedItem?._id
      );

      set.delete(pid);
      localStorage.setItem(WL_KEY, JSON.stringify([...set]));

      window.dispatchEvent(
        new CustomEvent("wishlist-changed", {
          detail: { productId: pid, isWishlisted: false, userId },
        })
      );
      toast.info("Item removed from wishlist 💖");
    } catch {
      toast.error("Failed to remove item");
    }
  };

  const handleAddToCart = async (product) => {
    if (!isLoggedIn()) {
      const goToLogin = window.confirm(
        "Please sign in to add this product to cart.\nPress OK for Login or Cancel for Register."
      );
      navigate(`/${goToLogin ? "login" : "register"}?${wishlistAuthQuery}`);
      return;
    }

    try {
      await axiosInstance.post("/cart/add", {
        productId: product?._id || product?.id || product?.productId,
        name: product?.name,
        image: product?.image,
        price: product?.price,
        quantity: 1,
      });
      toast.success("Product added to cart successfully 🛒");
      if (fetchCart) fetchCart();
    } catch (err) {
      toast.error("Something went wrong adding to cart");
    }
  };

  useEffect(() => {
    if (isLoggedIn()) fetchWishlist();
  }, []);

  if (!isLoggedIn()) {
    return (
      <div className="page-container text-center py-20">
        <Heart size={60} className="mx-auto text-pink-200 mb-6" />
        <h2 className="text-2xl font-black text-gray-900 mb-4">Your Favorites Await</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto">Please login to see the products you've saved to your beauty wishlist.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate(`/login?${wishlistAuthQuery}`)} className="btn-primary">Login</button>
          <button onClick={() => navigate(`/register?${wishlistAuthQuery}`)} className="btn-secondary">Register</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-pink-500 text-white rounded-2xl shadow-lg">
          <Heart size={24} fill="currentColor" />
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Wishlist <span className="text-pink-500">({wishlist.length})</span></h1>
      </div>

      {wishlist.length === 0 ? (
        <div className="card-beauty text-center py-20 bg-pink-50/20 border-pink-100">
          <ShoppingBag size={48} className="mx-auto text-pink-200 mb-4 opacity-50" />
          <p className="text-xl text-gray-400 font-bold mb-8">Your wishlist is empty today.</p>
          <button onClick={() => window.location.href='/shop'} className="btn-primary">Discover Beauty</button>
        </div>
      ) : (
        <>
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-hidden rounded-[2rem] border border-pink-50 shadow-sm">
            <table className="w-full text-left bg-white border-collapse">
              <thead>
                <tr className="bg-pink-50/50 text-pink-700 uppercase text-xs font-black tracking-widest">
                  <th className="p-6">Product Image</th>
                  <th className="p-6">Product Name</th>
                  <th className="p-6 text-center">Price</th>
                  <th className="p-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pink-50">
                {wishlist.map((product) => (
                  <tr key={product._id} className="group hover:bg-pink-50/20 transition-colors">
                    <td className="p-6">
                      <div className="w-20 h-20 bg-gray-50 rounded-2xl p-2 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                      </div>
                    </td>
                    <td className="p-6">
                      <h3 className="font-bold text-gray-900 max-w-xs">{product.name}</h3>
                      <p className="text-xs text-green-500 font-bold mt-1">In Stock</p>
                    </td>
                    <td className="p-6 text-center">
                      <span className="text-lg font-black text-pink-600">₹{(product.price * 80).toFixed(0)}</span>
                    </td>
                    <td className="p-6">
                      <div className="flex items-center justify-center gap-3">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-pink-700 transition active:scale-95"
                          title="Add to Cart"
                        >
                          <ShoppingCart size={16} /> Add
                        </button>
                        <button
                          onClick={() => removeFromWishlist(product._id)}
                          className="p-3 text-red-300 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                          title="Remove from favorites"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {wishlist.map((product) => (
              <div key={product._id} className="card-beauty flex gap-4 p-4 active:scale-[0.98] transition-transform">
                <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 flex-shrink-0 flex items-center justify-center">
                  <img src={product.image} alt={product.name} className="max-w-full max-h-full object-contain" />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-2 leading-tight">{product.name}</h3>
                    <p className="text-lg font-black text-pink-600 mt-1">₹{(product.price * 80).toFixed(0)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 mt-2">
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="flex-1 flex items-center justify-center gap-1 bg-pink-600 text-white py-2 rounded-xl text-xs font-bold active:scale-95 transition"
                    >
                      <ShoppingCart size={14} /> Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(product._id)}
                      className="p-2 text-red-400 bg-red-50 rounded-xl active:scale-95 transition"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Wishlist;
