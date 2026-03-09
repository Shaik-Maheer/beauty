


// import { Link, useLocation } from "react-router-dom";
// import { Home, Search, Heart, User, ShoppingCart, BookOpen } from "lucide-react"; // 👈 BookOpen for Blog

// const BottomNav = () => {
//   const location = useLocation();

//   const tabs = [
//     { to: "/home", icon: <Home size={20} />, label: "Home" },
//     { to: "/shop", icon: <Search size={20} />, label: "Shop" },
//     { to: "/wishlist", icon: <Heart size={20} />, label: "Wishlist" },
//     { to: "/cart", icon: <ShoppingCart size={20} />, label: "Cart" },
//     { to: "/blog", icon: <BookOpen size={20} />, label: "Blog" }, // 👈 Added Blog
//     { to: "/profile", icon: <User size={20} />, label: "Account" },
//   ];

//   return (
//     <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
//       <div className="flex justify-between items-center px-4 h-16">
//         {/* Left side brand name */}
//         <div className="font-bold text-pink-600 text-lg tracking-wide">
//           🌸 Stylistar
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-5 sm:gap-6">
//           {tabs.map((tab) => (
//             <Link
//               key={tab.to}
//               to={tab.to}
//               className={`flex flex-col items-center text-xs ${
//                 location.pathname === tab.to
//                   ? "text-pink-600 font-semibold"
//                   : "text-gray-500"
//               }`}
//             >
//               {tab.icon}
//               <span>{tab.label}</span>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default BottomNav;


import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Search,
  BookOpen,
  ShoppingCart,
  User,
  Sparkles, // ✨ for Services icon
} from "lucide-react";

const BottomNav = () => {
  const location = useLocation();

  const tabs = [
    { to: "/home", icon: <Home size={20} />, label: "Home" },
    { to: "/shop", icon: <Search size={20} />, label: "Shop" },
    { to: "/services", icon: <Sparkles size={20} />, label: "Services" }, // ✨ New Tab
    { to: "/cart", icon: <ShoppingCart size={20} />, label: "Cart" },
    { to: "/blog", icon: <BookOpen size={20} />, label: "Blog" },
    { to: "/profile", icon: <User size={20} />, label: "Account" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t z-50">
      <div className="flex justify-between items-center px-4 h-16">
        {/* Brand name */}
        {/* Brand name */}
        <div className="font-bold text-pink-600 text-lg sm:text-xl tracking-tight flex items-center gap-1">
          <span className="text-xl">🌸</span>
          <span className="nav-brand-full">Stylistar</span>
          <span className="nav-brand-short">S</span>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 sm:gap-8 overflow-x-auto no-scrollbar py-2">
          {tabs.map((tab) => (
            <Link
              key={tab.to}
              to={tab.to}
              className={`flex flex-col items-center min-w-[50px] transition-all duration-300 ${
                location.pathname === tab.to
                  ? "text-pink-600 scale-110 font-bold"
                  : "text-gray-400 hover:text-pink-400"
              }`}
            >
              <span className={`p-1 rounded-xl ${location.pathname === tab.to ? 'bg-pink-50' : ''}`}>
                {tab.icon}
              </span>
              <span className="text-[10px] sm:text-[11px] font-medium tracking-wide">{tab.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomNav;
