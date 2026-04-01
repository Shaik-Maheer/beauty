import { useParams, useNavigate, Link } from "react-router-dom";
import { useEffect, useState, useMemo, useRef } from "react";
import axios from "axios";
import { FaStar, FaRegStar } from "react-icons/fa";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import ProductCard from "./ProductCard";
import axiosInstance from "../utils/axiosInstance";
import { isLoggedIn } from "../utils/auth";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const PRIMARY_BASE = "/makeup/api/v1";
const SECONDARY_BASE = "https://makeup-api.herokuapp.com/api/v1";
const CACHE_KEY = "beauty_products_cache";

const priceINR = (p) => Math.max(499, Math.round((parseFloat(p ?? "0") || 0) * 80));
const safeText = (v, fallback = "N/A") => (typeof v === "string" && v.trim() ? v : fallback);
const stars = (n = 0) => Math.min(5, Math.max(0, Math.round(n)));

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [similar, setSimilar] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingSimilar, setLoadingSimilar] = useState(false);
  const [error, setError] = useState("");

  const isFetchingRef = useRef(false);
  const mockRating = useMemo(() => Math.floor(Math.random() * 3) + 3, [id]);

  // Helper to get all products (with caching)
  const getAllProducts = async () => {
    const cached = sessionStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.error("Cache read error", e);
      }
    }

    // If not in cache, fetch and store
    try {
      const url = `${PRIMARY_BASE}/products.json`;
      const altUrl = `${SECONDARY_BASE}/products.json`;
      
      let res;
      try {
        res = await axios.get(url, { timeout: 60000 });
      } catch {
        res = await axios.get(altUrl, { timeout: 60000 });
      }

      const raw = Array.isArray(res.data) ? res.data : [];
      const cleaned = raw.filter((p) => Number.isFinite(+p?.price) && +p.price > 0);
      
      if (cleaned.length > 0) {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify(cleaned));
      }
      return cleaned;
    } catch (e) {
      console.error("Failed to fetch product list", e);
      return [];
    }
  };

  const fetchProductData = async () => {
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    
    setLoading(true);
    setError("");

    try {
      // 1. Try fetching specific product first (fastest if API supports it well)
      let found = null;
      try {
        const r = await axios.get(`${PRIMARY_BASE}/products/${id}.json`, { timeout: 60000 });
        if (r.data?.id) found = r.data;
      } catch {
        try {
          const r = await axios.get(`${SECONDARY_BASE}/products/${id}.json`, { timeout: 60000 });
          if (r.data?.id) found = r.data;
        } catch {
          // Carry on to fallback
        }
      }

      // 2. Fallback to searching in full list (uses cache if available)
      if (!found) {
        const list = await getAllProducts();
        found = list.find((item) => String(item?.id) === String(id));
      }

      if (found) {
        setProduct(found);
        setLoading(false);
        // Fetch similar concurrently
        loadSimilar(found);
      } else {
        setError("Product not found.");
        setLoading(false);
      }
    } catch (e) {
      setError("Unable to load product details.");
      setLoading(false);
    } finally {
      isFetchingRef.current = false;
    }
  };

  const loadSimilar = async (baseProduct) => {
    setLoadingSimilar(true);
    try {
      const list = await getAllProducts();
      const byBrand = (baseProduct.brand || "").toLowerCase();
      const byType = (baseProduct.product_type || "").toLowerCase();

      const filtered = list
        .filter((p) => String(p?.id) !== String(baseProduct.id))
        .filter((p) => {
          const brandMatch = byBrand && (p?.brand || "").toLowerCase() === byBrand;
          const typeMatch = byType && (p?.product_type || "").toLowerCase() === byType;
          return byBrand ? brandMatch : typeMatch;
        })
        .slice(0, 8);

      setSimilar(filtered);
    } catch {
      setSimilar([]);
    } finally {
      setLoadingSimilar(false);
    }
  };

  const handleAddToCart = async () => {
    if (!isLoggedIn()) {
      toast.info("Please login to add items to cart");
      navigate("/login");
      return;
    }

    try {
      await axiosInstance.post("/cart/add", {
        productId: String(product?.id || product?.product_id),
        name: product?.name,
        image: product?.image_link || product?.image,
        price: priceINR(product?.price),
        quantity: 1,
      });
      toast.success("Product added to cart successfully 🛒");
    } catch (err) {
      console.error("Cart error:", err?.response?.data || err?.message);
      toast.error("Something went wrong adding to cart");
    }
  };

  useEffect(() => {
    fetchProductData();
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/shop");
    }
  };

  if (loading) {
    return (
      <div className="p-6 max-w-6xl mx-auto animate-pulse">
        <div className="h-6 w-20 bg-gray-200 rounded mb-6" />
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 bg-gray-200 h-[420px] rounded-2xl" />
          <div className="flex-1 space-y-4">
            <div className="h-10 bg-gray-200 rounded w-3/4" />
            <div className="h-4 bg-gray-200 rounded w-1/4" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
            <div className="h-32 bg-gray-200 rounded w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="p-12 max-w-4xl mx-auto text-center bg-gray-50 rounded-3xl border border-gray-100 mt-10">
        <div className="text-5xl mb-4">🔍</div>
        <p className="text-xl text-gray-700 font-medium mb-6">{error || "Product not found."}</p>
        <div className="flex justify-center gap-4">
            <button
                onClick={() => fetchProductData()}
                className="px-6 py-2 rounded-xl bg-pink-600 text-white hover:bg-pink-700 transition shadow-lg"
            >
                Retry
            </button>
            <Link
                to="/shop"
                className="px-6 py-2 rounded-xl border border-pink-600 text-pink-600 hover:bg-pink-50 transition"
            >
                Back to Shop
            </Link>
        </div>
      </div>
    );
  }

  const rating = stars(mockRating);
  const inr = priceINR(product.price);
  const colors = Array.isArray(product.product_colors) ? product.product_colors : [];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={handleBack}
          className="inline-flex items-center gap-2 text-pink-700 font-bold hover:translate-x-1 transition"
        >
          <ArrowLeft size={20} /> Back
        </button>
        <Link to="/shop" className="text-sm font-semibold text-gray-500 hover:text-pink-600 underline decoration-pink-300">
          All Collections
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-1/2 group">
          <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-50 transition-all duration-500 hover:shadow-2xl overflow-hidden relative">
            <img
              src={product.image_link}
              alt={product.name}
              className="w-full h-[450px] object-contain transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute top-6 left-6">
                <span className="bg-pink-600 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                    {product.brand}
                </span>
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-gray-900 leading-tight">
              {safeText(product.name)}
            </h1>
            <div className="flex items-center gap-3">
              <div className="flex text-yellow-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  i < rating ? <FaStar key={i} /> : <FaRegStar key={i} />
                ))}
              </div>
              <span className="text-sm font-bold text-gray-400">{rating}.0 Rating</span>
            </div>
          </div>

          <div className="flex items-baseline gap-4">
            <span className="text-4xl font-black text-pink-600">₹{inr}</span>
            <span className="text-sm text-gray-400 font-medium line-through">₹{Math.round(inr * 1.4)}</span>
            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded">40% OFF</span>
          </div>

          <div className="bg-pink-50/50 p-6 rounded-3xl border border-pink-100/50 space-y-4">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500" />
                Product Description
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed max-h-40 overflow-y-auto pr-2 custom-scrollbar">
              {safeText(product.description, "This designer product is formulated with premium ingredients to provide a flawless finish and long-lasting wear.")}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Category</p>
              <p className="font-bold text-gray-700">{safeText(product.category)}</p>
            </div>
            <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
              <p className="text-[10px] uppercase tracking-widest text-gray-400 font-black mb-1">Type</p>
              <p className="font-bold text-gray-700">{safeText(product.product_type)}</p>
            </div>
          </div>

          {colors.length > 0 && (
            <div className="space-y-3">
              <h3 className="font-bold text-gray-800 text-sm">Available Shades ({colors.length})</h3>
              <div className="flex flex-wrap gap-2.5">
                {colors.slice(0, 18).map((c, idx) => (
                  <div
                    key={idx}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-md cursor-help ring-1 ring-gray-100 hover:ring-pink-400 transition"
                    title={c.colour_name}
                    style={{ backgroundColor: c.hex_value }}
                  />
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex flex-col sm:flex-row gap-4">
             <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-2 bg-pink-600 text-white py-4 rounded-2xl font-bold hover:bg-pink-700 transition shadow-xl"
              >
                <ShoppingCart size={20} /> Add to Cart
              </button>
             <a
                href={product.product_link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition shadow-xl"
              >
                Visit Brand Website
              </a>
          </div>
        </div>
      </div>

      <section className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-black text-gray-900">Similar Products</h2>
          <Link to="/shop" className="text-pink-600 font-bold text-sm hover:underline">View All</Link>
        </div>

        {loadingSimilar ? (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="animate-pulse space-y-4">
                <div className="aspect-square bg-gray-200 rounded-3xl" />
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {similar.map((p) => (
              <ProductCard key={p.id || p.product_id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
