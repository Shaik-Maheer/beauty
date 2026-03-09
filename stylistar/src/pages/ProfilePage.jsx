import { 
  Heart, 
  Package, 
  LogOut, 
  ArrowLeft, 
  ShoppingBag, 
  ChevronRight, 
  ShoppingCart, 
  Sparkles, 
  BookOpen,
  LayoutDashboard
} from "lucide-react";
import { logout } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.info("Logged out successfully! 👋", {
      position: "top-right",
      autoClose: 2000
    });
    window.location.href = "/home";
  };

  const menuItems = [
    { 
      label: "Shop Products", 
      icon: <ShoppingBag size={22} className="text-pink-500" />, 
      link: "/shop",
      description: "Explore our latest beauty collections"
    },
    { 
      label: "Our Services", 
      icon: <Sparkles size={22} className="text-purple-500" />, 
      link: "/services",
      description: "Beauty salons and treatment lists"
    },
    { 
      label: "Beauty Blog", 
      icon: <BookOpen size={22} className="text-emerald-500" />, 
      link: "/blog",
      description: "Tips and news from the experts"
    },
    { 
      label: "My Shopping Bag", 
      icon: <ShoppingCart size={22} className="text-blue-500" />, 
      link: "/cart",
      description: "Check out your selected items"
    },
    { 
      label: "My Wishlist", 
      icon: <Heart size={22} className="text-red-500" />, 
      link: "/wishlist",
      description: "Items you've saved for later"
    },
    { 
      label: "Order History", 
      icon: <Package size={22} className="text-orange-500" />, 
      link: "/orders",
      description: "Track your beauty purchases"
    },
    { 
      label: "Sign Out", 
      icon: <LogOut size={22} className="text-gray-500" />, 
      onClick: handleLogout,
      description: "Logout from your account"
    },
  ];

  return (
    <div className="page-container bg-slate-50 min-h-screen pb-20">
      {/* Top Header */}
      <div className="flex items-center gap-4 p-6 bg-white/80 backdrop-blur-md sticky top-0 z-30 mb-10 border-b border-gray-100 shadow-sm">
        <button 
          onClick={() => navigate("/home")}
          className="flex items-center gap-2 text-gray-700 font-bold hover:text-pink-600 transition-colors"
        >
          <ArrowLeft size={20} /> <span className="text-sm uppercase tracking-widest">Back to Home</span>
        </button>
      </div>

      <div className="max-w-xl mx-auto px-4">
        {/* Title Section */}
        <div className="mb-10 text-center">
           <div className="inline-flex items-center justify-center p-4 bg-pink-100 rounded-3xl mb-4">
              <LayoutDashboard size={32} className="text-pink-600" />
           </div>
           <h2 className="text-3xl font-black text-gray-900 tracking-tight">My Beauty Experience</h2>
           <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.4em] mt-2">Stylistar Main Dashboard</p>
        </div>

        <div className="space-y-4 pb-10">
          {menuItems.map((item, idx) => (
            <div
              key={idx}
              onClick={() => item.link ? navigate(item.link) : item.onClick && item.onClick()}
              className="group bg-white rounded-[2rem] p-6 flex items-center justify-between shadow-sm border border-gray-100 hover:shadow-md hover:border-pink-100 hover:-translate-y-1 active:scale-[0.98] cursor-pointer transition-all duration-300"
            >
              <div className="flex items-center gap-6">
                <div className="p-4 bg-gray-50 rounded-2xl group-hover:bg-pink-50 transition-colors duration-300">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-black text-gray-800 tracking-tight text-lg leading-tight">{item.label}</h3>
                  <p className="text-xs font-bold text-gray-400 mt-1">{item.description}</p>
                </div>
              </div>
              <div className="flex items-center">
                 <ChevronRight size={24} className="text-gray-300 group-hover:text-pink-600 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          ))}
        </div>

        {/* Footer Brand */}
        <div className="mt-12 text-center pb-12">
          <div className="h-px bg-gray-200 w-24 mx-auto mb-8" />
          <p className="text-[10px] font-black text-gray-300 uppercase tracking-[0.6em] select-none">Stylistar Beauty</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
