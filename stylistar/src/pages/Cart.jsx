import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { isLoggedIn } from "../utils/auth";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";

const Cart = () => {
  const { cart, setCart } = useCart();
  const navigate = useNavigate();
  const cartAuthQuery = new URLSearchParams({
    next: "/cart",
    source: "cart",
  }).toString();

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.error("Error fetching cart", err);
    }
  };

  const updateQuantity = async (itemId, newQty) => {
    if (newQty < 1) return;
    try {
      await axiosInstance.put(`/cart/update/${itemId}`, { quantity: newQty });
      setCart((prev) =>
        prev.map((item) =>
          item._id === itemId ? { ...item, quantity: newQty } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity", err);
    }
  };

  const removeItem = async (id) => {
    try {
      await axiosInstance.delete(`/cart/remove/${id}`);
      setCart((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item", err);
    }
  };

  const clearCart = async () => {
    try {
      await axiosInstance.delete("/cart/clear");
      setCart([]);
      navigate("/shop");
    } catch (err) {
      console.error("Error clearing cart", err);
    }
  };

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;

  useEffect(() => {
    if (isLoggedIn()) fetchCart();
  }, []);

  if (!isLoggedIn()) {
    return (
      <div className="page-container text-center py-20">
        <div className="w-20 h-20 bg-pink-50 rounded-full flex items-center justify-center mx-auto mb-6 text-pink-600 font-bold text-3xl">!</div>
        <h2 className="text-2xl font-black text-gray-900 mb-4">Your Beauty Bag is Waiting</h2>
        <p className="text-gray-500 mb-8 max-w-sm mx-auto font-medium">Please login to see the items you've added to your cart and complete your purchase.</p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate(`/login?${cartAuthQuery}`)} className="btn-primary">Login</button>
          <button onClick={() => navigate(`/register?${cartAuthQuery}`)} className="btn-secondary">Register</button>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-pink-600 text-white rounded-2xl shadow-lg">
          <ShoppingBag size={24} />
        </div>
        <h1 className="text-3xl font-black text-gray-900">Your Bag <span className="text-pink-600">({cart.length})</span></h1>
      </div>

      {cart.length === 0 ? (
        <div className="card-beauty text-center py-16">
          <div className="text-6xl mb-6 opacity-20">✨</div>
          <p className="text-xl text-gray-500 font-bold mb-8">Your bag is currently empty.</p>
          <Link to="/shop" className="btn-primary">Start Shopping</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Cart Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div key={item._id} className="card-beauty flex flex-col sm:flex-row items-center gap-6 group">
                {/* Image */}
                <div className="w-24 h-24 bg-gray-50 rounded-2xl p-2 flex-shrink-0 group-hover:scale-105 transition-transform">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>

                {/* Info */}
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">{item.name}</h3>
                  <div className="flex items-center justify-center sm:justify-start gap-3 mb-3">
                    <span className="text-pink-600 font-black text-lg">₹{item.price}</span>
                    <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Per Item</span>
                  </div>

                  {/* Desktop Controls integrated */}
                  <div className="flex items-center justify-center sm:justify-start gap-6">
                    <div className="flex items-center bg-gray-50 rounded-xl p-1 border border-gray-100">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-1.5 hover:bg-white hover:text-pink-600 rounded-lg transition-all active:scale-90"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold text-gray-700">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1.5 hover:bg-white hover:text-pink-600 rounded-lg transition-all active:scale-90"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item._id)}
                      className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>

                {/* Subtotal Item */}
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-bold text-gray-400 uppercase mb-1">Total</p>
                  <p className="text-xl font-black text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-start">
              <button 
                onClick={clearCart} 
                className="text-gray-400 font-bold text-sm flex items-center gap-2 hover:text-pink-600 transition"
              >
                <Trash2 size={16} /> Clear Shopping Bag
              </button>
            </div>
          </div>

          {/* Checkout Summary Card */}
          <div className="lg:sticky lg:top-8">
            <div className="card-beauty bg-pink-50/50 border-pink-100 p-8 shadow-xl">
              <h2 className="text-xl font-black text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Bag Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-gray-600 font-medium">
                  <span>Estimated Shipping</span>
                  <span>₹{shipping}</span>
                </div>
                <div className="h-px bg-pink-100 my-4" />
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-black text-gray-900">Total Amount</span>
                  <span className="text-2xl font-black text-pink-600">₹{total}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={() => navigate("/checkout")}
                  className="w-full btn-primary py-4 shadow-pink-200"
                >
                  Proceed to Checkout
                </button>
                <button 
                  onClick={() => navigate("/shop")}
                  className="w-full btn-secondary py-4"
                >
                  Continue Shopping
                </button>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-4 grayscale opacity-50">
                 <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                 <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo.png" alt="UPI" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;

