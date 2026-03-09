import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { ShoppingBag, Calendar, CheckCircle, Package, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MyOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const fetchOrders = async () => {
        try {
            const res = await axiosInstance.get("/orders");
            setOrders(res.data);
        } catch (err) {
            console.error("Error fetching orders:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
    }, []);

    if (loading) {
        return (
            <div className="page-container flex justify-center items-center py-20">
                <p className="text-pink-600 font-bold animate-pulse">Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="page-container px-4">
            <button 
                onClick={() => navigate("/profile")}
                className="flex items-center gap-2 text-pink-600 font-bold mb-8 hover:-translate-x-1 transition-transform"
            >
                <ArrowLeft size={20} /> Back to Profile
            </button>

            <div className="flex items-center gap-4 mb-8">
                <div className="p-3 bg-pink-500 text-white rounded-2xl shadow-lg">
                    <Package size={24} />
                </div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">My Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="card-beauty text-center py-20 bg-pink-50/20">
                    <ShoppingBag size={48} className="mx-auto text-pink-200 mb-4 opacity-50" />
                    <p className="text-xl text-gray-500 font-bold mb-8">No orders yet. Start shopping!</p>
                    <button onClick={() => navigate("/shop")} className="btn-primary">Explore Products</button>
                </div>
            ) : (
                <div className="space-y-6 max-w-2xl mx-auto">
                    {orders.map((order) => (
                        <div key={order._id} className="card-beauty p-6 shadow-md border-pink-50">
                            <div className="flex justify-between items-start mb-6 border-b border-pink-50 pb-4">
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Order Date</p>
                                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                                        <Calendar size={14} className="text-pink-400" />
                                        {new Date(order.orderDate).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "short",
                                            day: "numeric"
                                        })}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                    <div className="flex items-center justify-end gap-1 text-green-500 font-black">
                                        <CheckCircle size={14} />
                                        {order.status}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-6">
                                {order.items.map((item, idx) => (
                                    <div key={idx} className="flex gap-4 items-center bg-pink-50/10 p-2 rounded-xl border border-pink-50">
                                        <div className="w-16 h-16 bg-white rounded-xl p-1 flex-shrink-0 flex items-center justify-center border border-pink-50">
                                            <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                                            <p className="text-xs text-gray-500 font-medium">Qty: {item.quantity} x ₹{item.price}</p>
                                        </div>
                                        <p className="font-black text-gray-900">₹{item.price * item.quantity}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between items-end pt-4 border-t border-pink-50">
                                <div>
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Payment Method</p>
                                    <p className="text-gray-900 font-bold uppercase">{order.paymentMethod}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-black text-gray-400 uppercase tracking-widest mb-1">Total Amount</p>
                                    <p className="text-2xl font-black text-pink-600">₹{order.totalAmount}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyOrders;
