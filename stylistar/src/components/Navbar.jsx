import { Link, useLocation, useNavigate } from "react-router-dom";
import { Search, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import { isLoggedIn } from "../utils/auth";
import { useState } from "react";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = (e) => {
    e.preventDefault();
    if(search.trim()) navigate(`/shop?q=${search}`);
    setIsMobileMenuOpen(false); // close menu on mobile search
  };

  const MobileLink = ({ to, children }) => (
    <Link 
      to={to} 
      onClick={() => setIsMobileMenuOpen(false)}
      className={`block px-6 py-4 text-sm tracking-widest font-bold transition-all border-b border-gray-50 ${
        location.pathname === to 
          ? 'text-pink-600 bg-pink-50/50' 
          : 'text-gray-700 hover:text-pink-600 hover:bg-pink-50/30'
      }`}
    >
      {children}
    </Link>
  );

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm transition-all print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-[72px]">
          
          {/* Left: Mobile Menu Toggle & Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 -ml-2 rounded-full text-gray-700 hover:bg-pink-50 hover:text-pink-600 transition duration-300 focus:outline-none focus:ring-2 focus:ring-pink-200"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link to="/home" className="flex items-center gap-2">
               <span className="text-2xl sm:text-3xl font-extrabold bg-gradient-to-r from-pink-600 to-pink-400 bg-clip-text text-transparent tracking-tight hover:opacity-80 transition duration-300">
                 STYLISTAR
               </span>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 font-semibold text-gray-700 text-sm tracking-wide">
            <Link to="/home" className={`hover:text-pink-600 hover:scale-105 line-clamp-1 transition-all duration-300 ${location.pathname==='/home'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>HOME</Link>
            <Link to="/shop" className={`hover:text-pink-600 hover:scale-105 line-clamp-1 transition-all duration-300 ${location.pathname==='/shop'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>SHOP</Link>
            <Link to="/services" className={`hover:text-pink-600 hover:scale-105 line-clamp-1 transition-all duration-300 ${location.pathname==='/services'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>LUXE SERVICES</Link>
            <Link to="/blog" className={`hover:text-pink-600 hover:scale-105 line-clamp-1 transition-all duration-300 ${location.pathname==='/blog'?'text-pink-600 border-b-2 border-pink-600 py-1':''}`}>BEAUTY ADVICE</Link>
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
          <div className="flex items-center gap-1 sm:gap-4 flex-shrink-0">
            <Link to={isLoggedIn() ? "/profile" : "/login"} className="flex flex-col items-center group cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300">
               <div className="p-2 sm:p-2.5 rounded-full group-hover:bg-pink-50 transition duration-300">
                  <User className="w-6 h-6 sm:w-6 sm:h-6 text-gray-700 group-hover:text-pink-600" strokeWidth={1.5} />
               </div>
            </Link>
            <Link to="/wishlist" className="flex flex-col items-center group relative cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300">
               <div className="p-2 sm:p-2.5 rounded-full group-hover:bg-pink-50 transition duration-300">
                 <Heart className="w-6 h-6 sm:w-6 sm:h-6 text-gray-700 group-hover:text-pink-600" strokeWidth={1.5} />
               </div>
            </Link>
            <Link to="/cart" className="flex flex-col items-center group relative cursor-pointer hover:scale-110 active:scale-95 transition-transform duration-300">
               <div className="p-2 sm:p-2.5 rounded-full group-hover:bg-pink-50 transition duration-300">
                 <ShoppingBag className="w-6 h-6 sm:w-6 sm:h-6 text-gray-700 group-hover:text-pink-600" strokeWidth={1.5} />
               </div>
            </Link>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-[0_10px_20px_rgba(0,0,0,0.1)] absolute w-full left-0 z-40 origin-top animate-in slide-in-from-top-4 fade-in duration-200">
          <div className="p-4 border-b border-gray-50 md:hidden bg-gray-50/50">
             <form onSubmit={handleSearch} className="w-full relative group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-pink-500 w-4 h-4 transition-colors duration-300" />
               <input 
                 type="text" 
                 placeholder="Search products..." 
                 className="w-full bg-white border border-gray-200 focus:bg-white focus:border-pink-300 rounded-full py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-300 focus:shadow-[0_0_10px_rgba(255,63,108,0.1)]"
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
               />
            </form>
          </div>
          <div className="flex flex-col max-h-[70vh] overflow-y-auto pb-4">
             <MobileLink to="/home">HOME</MobileLink>
             <MobileLink to="/shop">SHOP</MobileLink>
             <MobileLink to="/services">LUXE SERVICES</MobileLink>
             <MobileLink to="/blog">BEAUTY ADVICE (BLOG)</MobileLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
