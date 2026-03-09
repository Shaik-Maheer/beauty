import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import axiosInstance from "../utils/axiosInstance";
import { toast } from "react-toastify";
import { 
  CreditCard, 
  Truck, 
  MapPin, 
  User, 
  ChevronLeft, 
  ShieldCheck,
  ShoppingBag
} from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate(); 
  const [details, setDetails] = useState({
    name: "",
    address: "",
    payment: "cod",
  });

  const { cart, setCart } = useCart();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.name]: e.target.value });
  };

  const handleCheckout = async () => {
    if (!details.name.trim() || !details.address.trim()) {
      toast.warning("Please fill in your name and delivery address! 🌸");
      return;
    }
  
    try {
      // POST to /api/orders as requested
      await axiosInstance.post("/orders", {
        products: cart.map(item => ({
          productId: item.productId,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity
        })),
        totalAmount: total,
        paymentMethod: details.payment,
        shippingAddress: details.address, // keeping for record
        userName: details.name // keeping for record
      });

      // Clear cart on server
      await axiosInstance.delete("/cart/clear");
      
      toast.success("📦 Order placed successfully!", {
        position: "top-right",
        autoClose: 2000
      });
    
      setCart([]);
      localStorage.removeItem("cart");
    
      setTimeout(() => {
        navigate("/orders");
      }, 100);
    } catch (err) {
      console.error("Checkout error:", err);
      const msg = err?.response?.data?.message || err?.message || "Failed to place order. Please try again.";
      toast.error(msg);
    }
  };

  return (
    <div className="page-container">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button 
          onClick={() => navigate("/cart")}
          className="flex items-center gap-1 text-pink-600 font-bold hover:-translate-x-1 transition-transform"
        >
          <ChevronLeft size={20} /> Back to Bag
        </button>
        <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
          <ShieldCheck size={16} className="text-green-500" />
          Secure Checkout
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Left: Forms */}
        <div className="space-y-6">
          <div className="card-beauty">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <Truck size={22} className="text-pink-600" /> Shipping Details
            </h3>
            
            <div className="space-y-4">
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-pink-300" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={details.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 transition-all font-medium"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-4 top-3 text-pink-300" size={18} />
                <textarea
                  name="address"
                  placeholder="Complete Delivery Address"
                  value={details.address}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-pink-200 transition-all font-medium h-28 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="card-beauty">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <CreditCard size={22} className="text-pink-600" /> Payment Method
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {["cod", "upi", "card"].map((method) => (
                <label 
                  key={method}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    details.payment === method 
                      ? "border-pink-600 bg-pink-50 text-pink-700" 
                      : "border-gray-100 bg-white text-gray-400 hover:border-pink-100"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={details.payment === method}
                    onChange={handleChange}
                    className="hidden"
                  />
                  <span className="text-xs font-black uppercase tracking-widest">{method}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Summary Container */}
        <div className="space-y-6">
          <div className="card-beauty bg-pink-50/30 border-pink-100 p-8">
            <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
              <ShoppingBag size={22} className="text-pink-600" /> Order Summary
            </h3>
            
            <div className="space-y-4 max-h-60 overflow-y-auto pr-2 custom-scrollbar mb-6">
              {cart.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-white p-3 rounded-xl border border-pink-50 shadow-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-contain rounded-lg" />
                    <div>
                      <h4 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400 font-bold">{item.quantity} x ₹{item.price}</p>
                    </div>
                  </div>
                  <p className="font-black text-gray-900">₹{item.price * item.quantity}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-gray-600 font-medium">
                <span>Shipping Fee</span>
                <span>₹{shipping}</span>
              </div>
              <div className="h-px bg-pink-100 my-4" />
              <div className="flex justify-between items-baseline">
                <span className="text-lg font-black text-gray-900">Grand Total</span>
                <span className="text-2xl font-black text-pink-600">₹{total}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full btn-primary py-4 hidden lg:block"
            >
              Place Order ₹{total}
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Button */}
      <div className="lg:hidden fixed bottom-[72px] left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-pink-50 z-40">
        <button
          onClick={handleCheckout}
          className="w-full btn-primary py-4 shadow-xl"
        >
          Place Order ✨ ₹{total}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
