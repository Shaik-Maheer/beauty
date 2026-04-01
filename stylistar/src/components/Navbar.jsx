import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User } from "lucide-react";
import { isLoggedIn } from "../utils/auth";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if(search.trim()) navigate(`/shop?q=${search}`);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          
          {/* Logo */}
          <Link to="/home" className="flex items-center gap-2">
             <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent tracking-tight hover:opacity-80 transition duration-300">
               STYLISTAR
             </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-700 text-sm tracking-wide">
            <Link to="/home" className={`hover:text-pink-600 line-clamp-1 transition duration-300 ${location.pathname==='/home'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>HOME</Link>
            <Link to="/shop" className={`hover:text-pink-600 line-clamp-1 transition duration-300 ${location.pathname==='/shop'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>BRANDS</Link>
            <Link to="/shop" className="hover:text-pink-600 transition duration-300">MAKEUP</Link>
            <Link to="/services" className={`hover:text-pink-600 line-clamp-1 transition duration-300 ${location.pathname==='/services'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>LUXE SERVICES</Link>
            <Link to="/blog" className={`hover:text-pink-600 line-clamp-1 transition duration-300 ${location.pathname==='/blog'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>BEAUTY ADVICE</Link>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-sm xl:max-w-md mx-6 relative">
            <form onSubmit={handleSearch} className="w-full relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 w-5 h-5 transition-colors duration-300" />
               <input 
                 type="text" 
                 placeholder="Search on Stylistar" 
                 className="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-pink-300 rounded-full py-2.5 pl-12 pr-4 text-sm outline-none transition-all duration-300 shadow-inner focus:shadow-[0_0_15px_rgba(255,63,108,0.15)]"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link to={isLoggedIn() ? "/profile" : "/login"} className="flex flex-col items-center group cursor-pointer">
               <div className="p-2 rounded-full group-hover:bg-pink-50 transition duration-300">
                  <User className="w-[22px] h-[22px] sm:w-6 sm:h-6 text-gray-700 group-hover:text-pink-600" strokeWidth={1.5} />
               </div>
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center group relative cursor-pointer">
               <div className="p-2 rounded-full group-hover:bg-pink-50 transition duration-300">
                 <Heart className="w-[22px] h-[22px] sm:w-6 sm:h-6 text-gray-700 group-hover:text-pink-600" strokeWidth={1.5} />
               </div>
            </Link>
            <Link to="/cart" className="flex flex-col items-center group relative cursor-pointer">
               <div className="p-2 rounded-full group-hover:bg-pink-50 transition duration-300">
                 <ShoppingBag className="w-[22px] h-[22px] sm:w-6 sm:h-6 text-gray-700 group-hover:text-pink-600" strokeWidth={1.5} />
               </div>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
