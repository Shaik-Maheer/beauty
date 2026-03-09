import React from "react";

const Services = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#fff0f5] to-[#ffe4e6] text-[#240016] py-20 px-4 text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-lg md:text-xl mb-4 font-medium tracking-wide">
            Your go-to destination for bridal, glam & lifestyle beauty
          </p>
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            Transform Your Look <br /> 
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-[#f470a0] to-[#ff6b9f]">
              With Stylistar
            </span>
          </h1>
          <div className="mt-10">
            <button className="bg-[#240016] text-white px-8 py-3 rounded-full hover:bg-[#f470a0] hover:text-[#240016] transition duration-300 shadow-lg">
              Get in touch
            </button>
          </div>
        </div>

        {/* Decorative Gradient Circles */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-pink-300 opacity-30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-rose-400 opacity-30 rounded-full blur-3xl animate-pulse"></div>
      </section>

      {/* 🔥 Promo Banner */}
      <section className="bg-gradient-to-r from-[#f470a0] to-[#ff8bb3] text-white py-6 px-6 text-center shadow-md" data-aos="fade-up">
        <h2 className="text-2xl md:text-3xl font-bold tracking-wide">
          ✨ Get <span className="underline">20% OFF</span> Your First Booking ✨
        </h2>
        <p className="mt-2 text-lg font-light">
          *Valid for bridal & party makeup. Book now and glow effortlessly!
        </p>
        <button className="mt-4 px-8 py-3 rounded-full bg-white text-[#240016] font-semibold hover:bg-[#240016] hover:text-white transition duration-300">
          Claim Offer
        </button>
      </section>

      {/* Marquee section */}
      <div className=" bg-pink-300 text-[#240016] py-3 overflow-hidden">
        <div className="whitespace-nowrap animate-marquee flex items-center text-lg font-medium">
          <span className="mx-6">💄 Get Inspired Now</span>
          <span className="mx-6">💍 Get 20% OFF on Bridal Makeup</span>
          <span className="mx-6">🌸 Book a Festive Look Today</span>
        </div>
      </div>
      <style>
        {`
          .animate-marquee {
            display: inline-block;
            animation: marquee 25s linear infinite;
          }
          @keyframes marquee {
            0% { transform: translateX(100%); }
            100% { transform: translateX(-100%); }
          }
        `}
      </style>

      {/* Image + Video Grid Section */}
      <section className="bg-[#fff1f2] py-16 px-4">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-extrabold mb-4 text-rose-600">
            Our Makeup Signatures
          </h1>
          <p className="text-lg text-gray-700">
            From timeless bridal glam to runway bold looks – we create beauty that inspires ✨
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-10">
          {[
            "https://i.pinimg.com/736x/75/2a/4a/752a4abf2d135f29e5e7486bfdb987e9.jpg",
            "https://i.pinimg.com/736x/fd/c1/a5/fdc1a5059048561a1c63e31cefbe2dc9.jpg",
            "https://i.pinimg.com/736x/a4/f0/32/a4f032ca955302b448718e2c327a576a.jpg",
            "https://i.pinimg.com/736x/c0/64/52/c06452c6e275c91e8a714e43c2dbec37.jpg",
            "https://i.pinimg.com/736x/f7/13/f1/f713f1d75e184395e91a1c75daa34227.jpg",
            "https://i.pinimg.com/736x/3b/98/5f/3b985ff7ab622d59e6658fd1e0892b35.jpg",
            "https://i.pinimg.com/736x/c4/48/c6/c448c63d12058a459d265974ff93dedc.jpg",
            "https://i.pinimg.com/1200x/98/7c/12/987c12da616c19a018bf170cd1dcea41.jpg",
          ].map((src, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition"
            >
              <img
                src={src}
                alt={`Makeup ${i + 1}`}
                className="w-full h-72 object-cover transform group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-[#f470a0]/30 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-white font-semibold text-lg">
                Book This Look ✨
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-[#faf2f2] py-20 px-4">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 items-center gap-12">
          <div data-aos="fade-right">
            <img src="https://i.pinimg.com/736x/62/35/97/623597c063d115e66ec5402f2bb2f48d.jpg" alt="About Us" className="rounded-lg shadow-lg" />
          </div>
          <div data-aos="fade-left">
            <h2 className="text-4xl font-bold text-[#240016] mb-6">About Us</h2>
            <p className="text-[#240016] mb-6">
              Welcome to Stylistar – Mumbai’s one-stop beauty destination! Book our premium makeup and styling services right at your doorstep. From bridal glam to party-ready looks, we bring the salon experience home. Plus, explore and shop our freshly curated makeup products – all new, all fabulous, all Stylistar.
            </p>
            <button className="bg-[#240016] text-white px-6 py-3 rounded hover:bg-[#f472b6] hover:text-[#240016] transition duration-300">
              Learn Our Story
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="bg-[#ffe4e6] py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-[#240016] mb-12">Our Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {[
            "Bridal Makeup",
            "Party Makeup",
            "HD Makeup",
            "Airbrush Makeup",
            "Model Portfolio Shoots",
            "Fashion Runway Makeup",
            "Pre-Wedding Makeup",
            "Theatrical & Creative Looks",
          ].map((service, index) => (
            <div
              key={index}
              className="border-b-[5px] border-[#f470a0] bg-white text-[#240016] p-6 rounded-xl transition-all duration-300 ease-in-out hover:bg-[#fff0f5] hover:scale-105 hover:shadow-xl"
            >
              <h3 className="text-lg font-semibold mb-1">{service}</h3>
              <p className="text-sm leading-relaxed">
                Our professional <span className="font-medium">{service}</span> service is perfect for any occasion. Book now for a flawless look!
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={() =>
              document.getElementById("contact").scrollIntoView({ behavior: "smooth" })
            }
            className="bg-[#240016] text-white px-8 py-3 rounded-full hover:bg-[#f470a0] hover:text-[#240016] transition duration-300 shadow-md"
          >
            Book Me
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-[#fff1f2] py-20 px-4">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <div className="bg-[#240016] text-white p-8 rounded-lg">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-lg">
              Have a question or feedback for us? Reach out to our team for any inquiries or
              collaborations. We love hearing from our makeup community!
            </p>
          </div>
          <form
            className="space-y-6"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for reaching out! We’ll reply shortly 💬");
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" placeholder="First name *" className="bg-pink-200 p-3 rounded w-full" required />
              <input type="text" placeholder="Last name *" className="bg-pink-200 p-3 rounded w-full" required />
            </div>
            <input type="email" placeholder="Email *" className="bg-pink-200 p-3 rounded w-full" required />
            <input type="tel" placeholder="Phone" className="bg-pink-200 p-3 rounded w-full" />
            <textarea placeholder="Message" className="bg-pink-200 p-3 rounded w-full h-32" />
            <button type="submit" className="bg-[#240016] text-white px-6 py-3 rounded hover:bg-[#f472b6] hover:text-[#240016] transition duration-300">
              Submit
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#ffd6e5] px-6 py-10 grid md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-3xl font-bold mb-4">Stylistar</h3>
          <div className="flex space-x-4 mb-4">
            <a href="#"><i className="fab fa-facebook-f" /></a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-linkedin-in" /></a>
            <a href="#"><i className="fab fa-instagram" /></a>
          </div>
          <p>XXXXXXX157</p>
          <p>info@mysite.com</p>
          <p>500 Terry Francine St.<br />Mumbai, Maharashtra</p>
        </div>
        <div>
          <h4 className="text-xl font-semibold mb-4">Connect with Us</h4>
          <input type="email" placeholder="e.g., email@example.com" className="p-3 w-full rounded bg-white mb-2" />
          <button
            onClick={() => alert("Thanks for subscribing to Stylistar 💌")}
            className="w-full bg-[#240016] text-white py-3 rounded hover:bg-[#f472b6] hover:text-[#240016] transition"
          >
            Subscribe
          </button>
          <label className="block mt-3">
            <input type="checkbox" className="mr-2" />
            Yes, subscribe me to newsletter
          </label>
          <div className="mt-6">
            <p><a href="#" className="underline">Privacy Policy</a></p>
            <p><a href="#" className="underline">Accessibility Statement</a></p>
          </div>
        </div>
        <div className="col-span-2 text-center mt-10 text-sm">
          Made with ❤️ by Maheer for Makeup Lovers.
        </div>
      </footer>
    </>
  );
};

export default Services;




