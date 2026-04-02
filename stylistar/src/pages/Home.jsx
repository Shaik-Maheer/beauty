
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Marquee from "react-fast-marquee"; 
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin , FaTwitter  } from "react-icons/fa";

const Home = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    alert("Thank you for subscribing..!");
  };

  const testimonialSettings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 5000,
  };

  return (
    <div className="font-sans">

      {/* Hero Section */}
      <section className="relative h-[450px] md:h-[600px] flex items-center justify-center bg-gray-900 group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-900/60 to-transparent z-10 pointer-events-none"></div>
        <img
          src="https://i.pinimg.com/736x/5b/e5/1e/5be51edc77b6283db27fca13d355f0d3.jpg"
          alt="Glam Model"
          className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-[15s] ease-out"
        />
        <div className="relative z-20 text-center md:text-left px-6 w-full max-w-7xl mx-auto" data-aos="fade-up">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 drop-shadow-xl text-white">
             Unleash Your <br className="hidden md:block" /> Inner Glam
          </h1>
          <p className="text-lg md:text-2xl font-light mb-8 drop-shadow-md text-pink-50 max-w-xl">
             Discover luxury beauty, premium skincare, and timeless makeup aesthetics.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-gradient-to-r from-pink-600 to-rose-500 hover:from-pink-700 hover:to-rose-600 text-white font-bold px-10 py-4 rounded-full transition-all duration-300 shadow-[0_0_20px_rgba(255,63,108,0.4)] hover:shadow-[0_0_30px_rgba(255,63,108,0.6)] hover:-translate-y-1 transform"
          >
            Shop The Collection
          </Link>
        </div>
      </section>

      {/* Marquee Banner */}
      <div className="bg-pink-100/90 backdrop-blur-md py-3 border-b border-pink-200 hidden md:block">
        <Marquee gradient={false} speed={40}>
          <p className="text-pink-800 font-bold text-sm tracking-wide mx-12 flex items-center gap-2">
             <span className="text-lg">🌟</span> FREE SAMPLE WITH EVERY ORDER!
          </p>
          <p className="text-pink-800 font-bold text-sm tracking-wide mx-12 flex items-center gap-2">
             <span className="text-lg">💫</span> FREE SHIPPING ON ORDERS ABOVE ₹499!
          </p>
          <p className="text-pink-800 font-bold text-sm tracking-wide mx-12 flex items-center gap-2">
             <span className="text-lg">✨</span> 100% AUTHENTIC LUXURY PRODUCTS
          </p>
        </Marquee>
      </div>

   

     {/* Featured Categories */}
<section className="py-12 px-6 sm:px-12 bg-rose-50">
  <h2 className="text-3xl font-bold text-center mb-8">Shop by Category</h2>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
    {[
      {
        name: "Lipstick",
        img: "https://i.pinimg.com/736x/6c/b5/90/6cb59012a496ec8621180021e90b61b3.jpg",
      },
      {
        name: "Foundation",
        img: "https://i.pinimg.com/1200x/2f/7a/eb/2f7aeba81a0a6529abb53abe5ab08c7d.jpg",
      },
      {
        name: "Eyeliner",
        img: "https://i.pinimg.com/736x/83/8f/96/838f9610088ac68606295a384f498f40.jpg",
      },
      {
        name: "Mascara",
        img: "https://i.pinimg.com/1200x/06/6e/ec/066eec00fd8238826df341e096a955f4.jpg",
      },
      {
        name: "Blush",
        img: "https://i.pinimg.com/736x/78/40/63/78406323287fc5b6bc061d5d571cfe15.jpg",
      },
    ].map((cat) => (
      <div
        key={cat.name}
        className="p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition"
        data-aos="zoom-in"
      >
        <img
          src={cat.img}
          alt={cat.name}
          className="mx-auto mb-2 rounded-full w-[60px] h-[60px] object-cover"
        />
        <p className="font-semibold text-sm">{cat.name}</p>
      </div>
    ))}
  </div>
</section>


      {/* Top Brands Section */}
      <section className="py-16 md:py-20 px-4 sm:px-8 max-w-7xl mx-auto border-b border-gray-100">
        <div className="flex justify-between items-end mb-8">
           <div>
             <span className="text-pink-600 font-bold tracking-widest uppercase text-xs">Curated Portfolio</span>
             <h2 className="text-3xl md:text-3xl font-extrabold text-gray-900 tracking-tight mt-1">Top Brands</h2>
           </div>
           <Link to="/shop" className="text-pink-600 font-bold hover:text-pink-700 flex items-center gap-1 hover:gap-2 transition-all">Explore All</Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {[
            { name: "L'Oreal", img: "/images/one.jpg" },
            { name: "Maybelline", img: "/images/two.jpg" },
            { name: "MAC", img: "/images/three.jpg" },
            { name: "Rare Beauty", img: "/images/four.jpg" },
            { name: "Lakme", img: "/images/five.jpg" },
            { name: "NYX Cosmetics", img: "/images/six.jpg" },
          ].map((brand, idx) => (
            <Link to="/shop" key={idx} className="block bg-white rounded-3xl shadow-sm hover:shadow-xl border border-pink-50 hover:border-pink-200 overflow-hidden group transition-all duration-300" data-aos="fade-up" data-aos-delay={idx * 50}>
              <div className="aspect-square bg-white flex items-center justify-center p-6 relative">
                 <img src={brand.img} alt={brand.name} className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition duration-500 ease-out" />
              </div>
              <div className="bg-pink-50 py-3 text-center border-t border-pink-100 group-hover:bg-pink-600 transition duration-300">
                 <p className="font-bold text-gray-800 tracking-wide group-hover:text-white text-[12px]">{brand.name.toUpperCase()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Best Offers Banner */}
      <section className="py-16 px-4 sm:px-8 max-w-7xl mx-auto" data-aos="zoom-in">
         <div className="relative w-full h-64 md:h-80 rounded-[2rem] overflow-hidden shadow-2xl group">
             <img src="/images/banner1.jpg" alt="Offers Banner" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
             <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent flex items-center p-8 md:p-20">
                 <div className="text-white max-w-xl">
                    <span className="bg-pink-600 text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest mb-6 inline-block shadow-md">Festive Exclusive</span>
                    <h2 className="text-4xl md:text-5xl font-extrabold mb-4 drop-shadow-md">Flat 50% Off</h2>
                    <p className="text-gray-200 mb-8 hidden md:block text-xl font-light drop-shadow-sm">Upgrade your vanity with premium skincare and iconic makeup palettes.</p>
                    <Link to="/shop" className="bg-white text-pink-600 hover:bg-pink-50 font-bold px-10 py-4 rounded-full shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition transform hover:-translate-y-1 inline-block text-lg">Grab Deals</Link>
                 </div>
             </div>
         </div>
      </section>


{/* // 👇 Section JSX */}
<section className="py-16 px-6 sm:px-12 bg-[#fff0f5]">
  <h2 className="text-4xl font-bold text-center text-[#3D3D3D] mb-1">Thoughts to Share</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-#ffe4e6] ">
    {[
      {
        title: "Step-by-Step Guide to Creating Stunning Special Effects Makeup",
        img: "https://i.pinimg.com/736x/c2/01/0a/c2010a428f432e0980229e4163de4493.jpg",
        desc: "Learn how to create jaw-dropping effects with expert techniques used in film & TV."
      },
      {
        title: "Expert Tips for Achieving Bold and Dramatic Makeup Looks",
        img: "https://i.pinimg.com/736x/e5/be/fa/e5befa18dbababfdc9bbae07071ed9de.jpg",
        desc: "From smokey eyes to bold lips, master the art of dramatic beauty."
      },
      {
        title: "7 Must-Have Makeup Products for Flawless Everyday Looks",
        img: "https://i.pinimg.com/736x/e3/5e/e4/e35ee408556229672c1c4a18a4f05904.jpg",
        desc: "Simplify your routine with these top essentials handpicked by pros."
      }
    ].map((item, i) => (
      
      <div className="rounded-lg overflow-hidden shadow-md ">
  {/* IMAGE */}
  <img
    src={item.img}
    alt={item.title}
    className="w-full h-72 object-cover"
  />
  {/* TEXT BELOW IMAGE */}
  <div className="p-4 ">
    <h3 className="text-lg font-bold text-gray-800">{item.title}</h3>
    <p className="text-sm text-gray-600">{item.desc}</p>
  </div>
</div>

    ))}
  </div>

  <div className="text-center mt-10">
    <Link
      to="/blog"
      className="inline-block bg-[#2B001F] text-white px-6 py-3 rounded-md font-medium hover:bg-[#3a0033] transition"
    >
      Read more
    </Link>
  </div>
</section>


{/* 💄 Services / Promotions Section */}
<section className="bg-[#faf2f2] py-16 px-6 sm:px-12">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        title: "FREE GIFTS WITH PURCHASE",
        desc: "Stock up on all your favorite brands, then try something new on us",
        link: "Browse Now",
        href: "/shop",
        img: "https://i.pinimg.com/1200x/f5/d4/91/f5d491fca33948775ebc6ac6604b984e.jpg"
      },
      {
        title: "EXCLUSIVE IN-STORE EVENTS",
        desc: "And only Stylistar has them: personalized consultations with your favorite beauty brands, gifts with purchase, product samples and more—all for free!",
        link: "Learn More",
        href: "/blog",
        img: "https://i.pinimg.com/736x/84/3a/3d/843a3db6437ac58ed5d99531a098a868.jpg"
      },
      {
        title: "STYLISTAR MAKEUP",
        desc: "Flawless makeup services for weddings, parties, shoots & all your special events.",
        link: "Explore Our Services",
        href: "/services",
        img: "https://i.pinimg.com/736x/63/58/19/635819056f8b0911dc5a1f17feb90cb4.jpg"
      }
      
    ].map((item, idx) => (
      <div
        key={idx}
        className="text-center"
        data-aos="fade-up"
        data-aos-delay={idx * 100}
      >
        <div className="overflow-hidden rounded-md mb-6">
          <img
            src={item.img}
            alt={item.title}
            className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <h3 className="text-xl font-bold text-[#111] mb-2">{item.title}</h3>
        <p className="text-sm text-gray-700 mb-4">{item.desc}</p>
        <a
          href={item.href}
          className="text-sm font-semibold underline hover:text-rose-600 transition"
        >
          {item.link.toUpperCase()}
        </a>
      </div>
    ))}
  </div>
</section>



  
      {/* Testimonials Carousel */}
      <section className="py-12 px-6 sm:px-12 bg-white">
        <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say 💬</h2>
        <div className="max-w-2xl mx-auto" data-aos="zoom-in-up">
          <Slider {...testimonialSettings}>
            <div className="bg-rose-100 p-6 rounded-lg mx-2">
              <p className="text-gray-800">“Absolutely love the texture and color payoff. My skin feels amazing!”</p>
              <p className="mt-4 font-semibold text-rose-800">– Priya S.</p>
            </div>
            <div className="bg-rose-100 p-6 rounded-lg mx-2">
              <p className="text-gray-800">“Quick delivery and beautiful packaging. Worth every penny!”</p>
              <p className="mt-4 font-semibold text-rose-800">– Meera K.</p>
            </div>
          </Slider>
        </div>
      </section>

   


{/* Newsletter Section */}
<section className="bg-rose-50 text-gray-800 py-12 px-6 sm:px-12 text-center">
  <h2 className="text-3xl font-bold mb-4">Join Stylistar 💌</h2>
  <p className="mb-6">Subscribe for beauty tips, exclusive spa deals & new arrivals.</p>
  <form
    onSubmit={handleSubscribe}
    className="flex flex-col sm:flex-row justify-center gap-4 max-w-xl mx-auto"
  >
    <input
      type="email"
      placeholder="Enter your email"
      className="px-4 py-2 rounded-full text-black w-full sm:w-2/3 focus:outline-none focus:ring-2 focus:ring-rose-300 bg-[#ffe4e6]"
      required
    />
    <button
      type="submit"
      className="bg-rose-400 text-white font-semibold px-6 py-2 rounded-full hover:bg-rose-500 transition"
    >
      Subscribe
    </button>
  </form>
</section>



{/* Footer Section */}
<footer className="bg-white border-t text-gray-700 px-6 sm:px-12 pt-12 pb-6">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm mb-10">
    
    {/* Column 1 - Company */}
    <div>
      <h3 className="font-bold text-lg text-rose-500 mb-3">Stylistar</h3>
      <p className="mb-2">Your one-stop destination for luxury beauty products and spa care.</p>
      <p className="text-xs mt-4">© {new Date().getFullYear()} Stylistar. All rights reserved.</p>
    </div>

    {/* Column 2 - Shop */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-3">Shop</h4>
      <ul className="space-y-2">
        <li><a href="/shop" className="hover:text-rose-500">All Products</a></li>
        <li><a href="/wishlist" className="hover:text-rose-500">Wishlist</a></li>
        <li><a href="/cart" className="hover:text-rose-500">Cart</a></li>
        <li><a href="/shop" className="hover:text-rose-500">Offers & Deals</a></li>
      </ul>
    </div>

    {/* Column 3 - Spa Services */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-3">Services</h4>
      <ul className="space-y-2">
        <li><a href="/services" className="hover:text-rose-500">MakeUp Appointments</a></li>
        <li><a href="/services" className="hover:text-rose-500">Book Appointment</a></li>
        <li><a href="/services" className="hover:text-rose-500">In-store Events</a></li>
        <li><a href="/services" className="hover:text-rose-500">Free Consultation</a></li>
      </ul>
    </div>

    {/* Column 4 - Support */}
    <div>
      <h4 className="font-semibold text-gray-900 mb-3">Support</h4>
      <ul className="space-y-2">
        <li><a href="/services" className="hover:text-rose-500">Contact Us</a></li>
        <li><a href="/services" className="hover:text-rose-500">FAQs</a></li>
        <li><a href="/cart" className="hover:text-rose-500">Shipping & Returns</a></li>
        <li><a href="/services" className="hover:text-rose-500">Privacy Policy</a></li>
      </ul>
    </div>
  </div>

  {/* Social Icons */}
  <div className="flex justify-center gap-6 text-2xl text-rose-400 mb-6">
    <a href="https://www.instagram.com/" aria-label="Instagram"><FaInstagram /></a>
    <a href="https://www.facebook.com/" aria-label="Facebook"><FaFacebook /></a>
    <a href="https://x.com/" aria-label="Twitter"><FaTwitter /></a>
    <a href="https://www.youtube.com/" aria-label="YouTube"><FaYoutube /></a>
  </div>

  <p className="text-center text-xs text-gray-400">Made with 💖 by Shaik Maheer</p>

{/* location setup */}

<section className="bg-[#fff1f2] py-16 px-6">
  <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
    
    {/* Left Content */}
    <div data-aos="fade-right">
      <h4 className="text-2xl font-bold text-rose-600 mb-4">Visit Us In Person</h4>
      <p className="text-lg mb-2">Stylistar Flagship Store & Spa</p>
      <p className="mb-4">📍 Mumbai, India 🇮🇳</p>
      <p className="text-gray-700 mb-4">
        Come experience luxury beauty and spa treatments in our Mumbai studio. 
        Walk-ins welcome, but bookings preferred for bridal & spa sessions. 💕
      </p>
      <Link to="/services" className="inline-block bg-[#240016] text-white px-6 py-3 rounded-lg hover:bg-rose-500 hover:text-white transition">
        Book an Appointment
      </Link>
    </div>

    {/* Right Map */}
    <div data-aos="fade-left">
      <img
        src="/images/map.png"
        alt="Map of Mumbai"
        className="rounded-xl shadow-xl w-full"
      />
    </div>

  </div>
</section>


</footer>

      
    </div>
  );
};

export default Home;


