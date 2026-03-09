import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { X } from "lucide-react";

const categories = ["lipstick", "foundation", "eyeliner", "mascara", "blush"];
const sortOptions = [
  { label: "Price: Low to High", value: "lowToHigh" },
  { label: "Price: High to Low", value: "highToLow" },
  { label: "Name: A to Z", value: "nameAZ" },
  { label: "Name: Z to A", value: "nameZA" },
  { label: "Top Rated", value: "topRated" },
];

const CACHE_KEY = "beauty_products_cache";

const Shop = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState("lowToHigh");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isFetchingRef = useRef(false);
  const itemsPerPage = 8;

  // Updated endpoints to use brand-filtered data for faster initial load
  const API_URL = "/makeup/api/v1/products.json?brand=maybelline";
  const SECONDARY_URL = "https://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline";

  const loadProducts = async (attempt = 1) => {
    // Avoid duplicate concurrent triggers
    if (isFetchingRef.current && attempt === 1) return;
    isFetchingRef.current = true;

    // 1. Check Cache (only on initial load)
    if (attempt === 1) {
      const cached = sessionStorage.getItem(CACHE_KEY);
      if (cached) {
        try {
          const parsed = JSON.parse(cached);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAllProducts(parsed);
            setLoading(false);
            isFetchingRef.current = false;
            return;
          }
        } catch (e) {
          console.error("Cache parse error", e);
        }
      }
    }

    setLoading(true);
    setError("");

    try {
      // Increased timeout to 30000ms as requested
      const config = { timeout: 30000 };
      let res;
      
      try {
        res = await axios.get(API_URL, config);
      } catch (e) {
        // Fallback directly to external URL if proxy fails or timeouts
        res = await axios.get(SECONDARY_URL, config);
      }

      const raw = Array.isArray(res.data) ? res.data : [];
      const cleaned = raw.filter((p) => Number.isFinite(+p?.price) && +p.price > 0);

      if (cleaned.length > 0) {
        setAllProducts(cleaned);
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(cleaned));
        setError("");
      } else {
        throw new Error("No products found in response");
      }
    } catch (e) {
      console.error(`Fetch error (attempt ${attempt}):`, e);

      if (attempt < 3) {
        // Exponential backoff: 2s, 4s
        const delay = attempt * 2000;
        console.log(`Retrying in ${delay}ms...`);
        setTimeout(() => loadProducts(attempt + 1), delay);
        return; // Don't turn off loading state yet
      } else {
        setError("Unable to load products. The API might be slow or down.");
        toast.error("Failed to fetch products after multiple attempts.");
      }
    } finally {
      // Only turn off loading if we're not retrying or if we're on the last attempt
      if (attempt >= 3 || !isFetchingRef.current) {
        setLoading(false);
        isFetchingRef.current = false;
      }
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // Compute available brands dynamically
  const brands = useMemo(() => {
    const b = allProducts.map(p => p.brand).filter(Boolean);
    return [...new Set(b)].sort();
  }, [allProducts]);

  // Optimized Filtering & Sorting
  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    // Category Filter (Multi-select)
    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      data = data.filter((p) => selectedCategories.includes(p?.product_type || ""));
    }

    // Brand Filter (Multi-select)
    if (selectedBrands.length > 0 && !selectedBrands.includes("all")) {
        data = data.filter((p) => selectedBrands.includes(p?.brand || ""));
    }

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      data = data.filter((p) => (p?.name || "").toLowerCase().includes(q));
    }

    data = data.filter((p) => {
      const priceINR = Math.round((+p?.price || 0) * 80);
      return priceINR >= priceRange[0] && priceINR <= priceRange[1];
    });

    if (sortBy === "lowToHigh") {
      data.sort((a, b) => (+a?.price || 0) - (+b?.price || 0));
    } else if (sortBy === "highToLow") {
      data.sort((a, b) => (+b?.price || 0) - (+a?.price || 0));
    } else if (sortBy === "nameAZ") {
      data.sort((a, b) => (a?.name || "").localeCompare(b?.name || ""));
    } else if (sortBy === "nameZA") {
      data.sort((a, b) => (b?.name || "").localeCompare(a?.name || ""));
    } else if (sortBy === "topRated") {
        data.sort((a, b) => (b?.rating || 0) - (a?.rating || 0));
    }

    return data;
  }, [allProducts, selectedCategories, selectedBrands, searchTerm, priceRange, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginated = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedBrands, searchTerm, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setPriceRange([0, 5000]);
    setSortBy("lowToHigh");
    setSearchTerm("");
    toast.info("Filters reset");
  };

  const SidebarContent = () => {
    const handleCategoryChange = (cat) => {
      setSelectedCategories((prev) => {
        if (cat === "all") return prev.includes("all") ? [] : ["all"];
        const next = prev.filter((c) => c !== "all");
        if (next.includes(cat)) {
          return next.filter((c) => c !== cat);
        } else {
          return [...next, cat];
        }
      });
    };

    const handleBrandChange = (brand) => {
      setSelectedBrands((prev) => {
        if (brand === "all") return prev.includes("all") ? [] : ["all"];
        const next = prev.filter((b) => b !== "all");
        if (next.includes(brand)) {
          return next.filter((b) => b !== brand);
        } else {
          return [...next, brand];
        }
      });
    };

    return (
      <div className="w-64 bg-pink-50 rounded-xl p-4 shadow-sm h-fit space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-pink-700">Filters</h2>
          <button className="md:hidden" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Search</p>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 border rounded focus:outline-pink-500"
          />
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Categories</p>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            <label className="flex items-center cursor-pointer hover:text-pink-600 transition">
              <input
                type="checkbox"
                checked={selectedCategories.includes("all") || selectedCategories.length === 0}
                onChange={() => handleCategoryChange("all")}
                className="mr-2 accent-pink-600"
              />
              All Categories
            </label>
            {categories.map((cat) => (
              <label key={cat} className="flex items-center cursor-pointer hover:text-pink-600 transition">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="mr-2 accent-pink-600"
                />
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Brands</p>
          <div className="space-y-1 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
            <label className="flex items-center cursor-pointer hover:text-pink-600 transition">
              <input
                type="checkbox"
                checked={selectedBrands.includes("all") || selectedBrands.length === 0}
                onChange={() => handleBrandChange("all")}
                className="mr-2 accent-pink-600"
              />
              All Brands
            </label>
            {brands.map((brand) => (
              <label key={brand} className="flex items-center cursor-pointer hover:text-pink-600 transition">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(brand)}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2 accent-pink-600"
                />
                {brand.charAt(0).toUpperCase() + brand.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Price Range (₹)</p>
          <Slider
            range
            min={0}
            max={5000}
            step={50}
            value={priceRange}
            onChange={(val) => setPriceRange(val)}
            trackStyle={[{ backgroundColor: "#db2777" }]}
            handleStyle={[
              { borderColor: "#db2777", backgroundColor: "#fff" },
              { borderColor: "#db2777", backgroundColor: "#fff" },
            ]}
          />
          <div className="text-sm mt-2 flex justify-between font-mono text-pink-700 font-bold">
            <span>₹{priceRange[0]}</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-2">Sort By</p>
          <div className="space-y-1">
            {sortOptions.map((option) => (
              <label key={option.value} className="flex items-center cursor-pointer hover:text-pink-600 transition">
                <input
                  type="radio"
                  name="sortBy"
                  value={option.value}
                  checked={sortBy === option.value}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="mr-2 accent-pink-600"
                />
                {option.label}
              </label>
            ))}
          </div>
        </div>

        <button
          onClick={resetFilters}
          className="w-full bg-pink-600 text-white py-3 rounded-xl font-bold hover:bg-pink-700 transition shadow-lg active:scale-95"
        >
          Reset All Filters
        </button>
      </div>
    );
  };

  const renderPagination = () => {
    if (filteredProducts.length === 0) return null;

    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    if (currentPage <= 3) endPage = Math.min(maxVisible, totalPages);
    if (currentPage >= totalPages - 2) startPage = Math.max(totalPages - maxVisible + 1, 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 mx-1 border rounded transition ${
            i === currentPage
              ? "bg-pink-600 text-white border-pink-600"
              : "hover:bg-pink-100 text-pink-700 border-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="flex flex-col items-center mt-10 gap-2 mb-20">
        <div className="flex flex-wrap justify-center items-center gap-1">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 mx-1 border rounded hover:bg-pink-100 disabled:opacity-50 text-pink-700"
          >
            Prev
          </button>
          {pages}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 mx-1 border rounded hover:bg-pink-100 disabled:opacity-50 text-pink-700"
          >
            Next
          </button>
        </div>
        <p className="text-sm text-gray-500 font-medium">
          Page {currentPage} of {totalPages}
        </p>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar Trigger */}
        <div className="md:hidden">
            <button
            className="w-full bg-pink-600 text-white py-3 px-6 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg active:scale-95 transition"
            onClick={() => setSidebarOpen(true)}
            >
            <span className="text-lg">⚡</span> Filters & Search
            </button>
        </div>

        {/* Mobile Filter Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-end md:hidden">
            <div className="bg-white w-full rounded-t-3xl p-6 shadow-2xl animate-slide-up h-[80vh] overflow-y-auto">
              <SidebarContent />
            </div>
          </div>
        )}

        <main className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-extrabold text-gray-900">
              {selectedCategories.length === 1 && selectedCategories[0] !== "all"
                ? selectedCategories[0].charAt(0).toUpperCase() + selectedCategories[0].slice(1)
                : "All Collection"}
              <span className="ml-3 text-sm font-medium text-pink-600 bg-pink-50 px-3 py-1 rounded-full">
                {filteredProducts.length} items
              </span>
            </h1>
          </div>

          {loading && allProducts.length === 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div key={idx} className="animate-pulse border rounded-2xl p-4 space-y-4">
                  <div className="bg-gray-200 h-56 rounded-xl" />
                  <div className="h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-200 rounded w-1/2" />
                  <div className="h-10 bg-gray-200 rounded-lg w-full" />
                </div>
              ))}
            </div>
          ) : error && allProducts.length === 0 ? (
            <div className="text-center py-20 bg-red-50 rounded-3xl border border-red-100">
              <div className="text-5xl mb-4">⚠️</div>
              <p className="text-red-700 font-semibold mb-6">{error}</p>
              <button
                onClick={() => loadProducts()}
                className="px-8 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition shadow-lg"
              >
                Try Again
              </button>
            </div>
          ) : filteredProducts.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {paginated.map((product) => (
                  <ProductCard key={product.id || product.product_id} product={product} />
                ))}
              </div>
              {renderPagination()}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <div className="text-6xl mb-6 opacity-40">✨</div>
              <p className="text-xl text-gray-500 font-medium mb-6">
                Oops! No products match your selection.
              </p>
              <button
                onClick={resetFilters}
                className="bg-pink-600 text-white px-8 py-3 rounded-xl hover:bg-pink-700 transition shadow-xl"
              >
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Shop;
