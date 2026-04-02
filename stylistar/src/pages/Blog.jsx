
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const blogPosts = [
  {
    title: "Everyday Makeup Routine for Beginners",
    description:
      "Learn how to create a flawless everyday makeup look with just a few essential products.",
    image:
      "https://i.pinimg.com/736x/3d/32/e8/3d32e86c83c41c6cabfe5ce5981f1c9a.jpg",
    link: "#",
  },
  {
    title: "10 Must-Have Lipsticks for Every Skin Tone",
    description:
      "Find your perfect lipstick shade from our handpicked universal favorites.",
    image:
      "https://i.pinimg.com/736x/a6/c0/4f/a6c04f4dc2d4c1038874c317144c14cf.jpg",
    link: "#",
  },
  {
    title: "DIY Skincare Before Makeup",
    description:
      "Prep your skin with natural ingredients to make your makeup last longer and look smoother.",
    image:
      "https://i.pinimg.com/736x/2b/a8/6c/2ba86ce37f0a901f16eb75ccffb0f5c2.jpg",
    link: "#",
  },
];

export default function Blog() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <>
      {/* 🔥 Modern Hero Section */}
      <section className="relative bg-gradient-to-r from-[#fff0f5] via-[#ffe4e6] to-[#faf2f2] py-24 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center" data-aos="fade-up">
          {/* Content */}
          <span className="inline-block bg-[#f470a0] text-white px-4 py-1.5 rounded-full text-sm font-bold mb-6 shadow-md tracking-wider">
            PREMIUM CONTENT ✨
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-tight mb-8">
            The Ultimate <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#f470a0] to-rose-400">Beauty Blog</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            Discover the latest trends in skincare, professional makeup tutorials, and lifestyle secrets curated just for you. Your daily dose of glam starts here 💖
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-10 py-4 bg-gradient-to-r from-[#f470a0] via-pink-500 to-rose-400 text-white font-bold rounded-full shadow-lg hover:shadow-pink-300 hover:scale-105 transition-all duration-300">
              Explore Articles →
            </button>
            <button className="px-10 py-4 bg-white text-[#f470a0] font-bold rounded-full shadow-md border border-pink-100 hover:bg-pink-50 transition-all duration-300">
              Join Newsletter
            </button>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-16 px-6 bg-[#faf2f2]" id="blog">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              data-aos="zoom-in-up"
              className="bg-[#fff0f5] rounded-2xl overflow-hidden shadow-md border hover:shadow-pink-200 hover:scale-105 transition-all duration-500 ease-in-out"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover hover:brightness-110 transition"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">
                  {post.description}
                </p>
                <a
                  href={post.link}
                  className="text-pink-600 font-bold hover:text-orange-500 transition"
                >
                  Read More →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tips Section */}
      <section className="bg-[#ffe4e6] px-6 py-16 text-gray-800">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div data-aos="fade-right">
            <h2 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
              Exclusive Pro Makeup Tips
            </h2>
            <p className="mb-6 text-lg text-gray-700">
              Glow like never before with our curated professional makeup
              secrets. Easy, beginner-friendly, and stunning results!
            </p>
            <ul className="list-disc list-inside space-y-2 text-base text-gray-600">
              <li>Prep your skin with a hydrating primer.</li>
              <li>Use damp beauty blenders for a natural finish.</li>
              <li>Apply concealer in a triangle shape under your eyes.</li>
              <li>Use lip liner to define and shape your lips before lipstick.</li>
              <li>Set your look with a setting spray for all-day wear.</li>
            </ul>
          </div>
          <div className="flex justify-center" data-aos="fade-left">
            <img
              src="https://i.pinimg.com/736x/e7/68/e6/e768e6dea8f356f135cfb021622e1983.jpg"
              alt="Makeup Tutorial"
              className="rounded-2xl shadow-lg w-full max-w-md hover:scale-105 hover:shadow-2xl transition duration-500"
            />
          </div>
        </div>

        {/* Video Section */}
        <div className="mt-16" data-aos="fade-up">
          <h3 className="text-3xl font-semibold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-orange-400">
            Watch Our Pro Makeup Guide 🎥
          </h3>
          <div className="aspect-w-16 aspect-h-9 max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-pink-300 transition">
            <iframe
              className="w-full h-[500px]"
              src="https://www.youtube.com/embed/rmOBMRPGYKo"
              title="Makeup Tutorial"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Quiz Section */}
      <section
        className="bg-[#faf2f2] py-10 px-4 sm:px-12 rounded-xl"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-rose-600">
          Know Your Skin Type
        </h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.target;
            const answers = Array.from(
              form.querySelectorAll("input[type='radio']:checked")
            ).map((input) => input.value);
            if (answers.length < 5) {
              alert("Please answer all the questions.");
              return;
            }
            const score = answers.reduce(
              (acc, val) => acc + parseInt(val),
              0
            );
            let skinType = "";
            if (score <= 5) skinType = "Oily Skin";
            else if (score <= 10) skinType = "Combination Skin";
            else if (score <= 15) skinType = "Normal Skin";
            else skinType = "Dry Skin";
            alert(`Your Skin Type is: ${skinType}`);
            form.reset();
          }}
          className="space-y-6 max-w-2xl mx-auto bg-white shadow-lg p-8 rounded-2xl hover:shadow-xl transition"
        >
          {[
            {
              q: "1. How does your face feel a few hours after cleansing?",
              a: [
                "Tight & flaky",
                "Smooth & comfortable",
                "Shiny on T-zone",
                "Greasy overall",
              ],
            },
            {
              q: "2. How often do you get breakouts?",
              a: ["Rarely", "Sometimes", "Often", "Very often"],
            },
            {
              q: "3. How does your skin look without moisturizer?",
              a: ["Very dry", "Slightly dry", "Normal", "Shiny"],
            },
            {
              q: "4. Do you have visible pores?",
              a: [
                "Not visible",
                "Slightly visible",
                "Visible in T-zone",
                "Large & visible everywhere",
              ],
            },
            {
              q: "5. What best describes your skin texture?",
              a: [
                "Rough & flaky",
                "Smooth",
                "Smooth with oily patches",
                "Greasy & uneven",
              ],
            },
          ].map((qItem, index) => (
            <div key={index}>
              <p className="font-semibold mb-2">{qItem.q}</p>
              <div className="space-y-1">
                {qItem.a.map((option, idx) => (
                  <label key={idx} className="block">
                    <input
                      type="radio"
                      name={`q${index}`}
                      value={idx + 1}
                      className="mr-2 accent-pink-500"
                      required
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-500 to-orange-400 text-white px-6 py-2 rounded-full hover:opacity-90 transition"
          >
            Submit
          </button>
        </form>
      </section>
{/* 🔥 Marquee Section */}
<div className="bg-[#f470a0] text-white py-3 overflow-hidden relative">
  <div className="animate-marquee whitespace-nowrap">
    <span className="mx-10"> Bridal Packages 20% OFF</span>
    <span className="mx-10">🌟 New Skincare Range Just Launched</span>
    <span className="mx-10">🎉 Book Your Occasion Makeup Now</span>
    <span className="mx-10">✨ Free Shipping on Orders Over ₹999</span>
  </div>
</div>

      {/* Newsletter Section */}
      <div
        className="relative bg-gradient-to-br from-[#fff0f5] via-[#faf2f2] to-[#ffe4e6] py-24 px-6 overflow-hidden rounded-2xl shadow-lg"
        data-aos="fade-up"
      >
        {/* Floating Glow Circles */}
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-200 opacity-40 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-[#f470a0] opacity-30 rounded-full blur-3xl animate-bounce"></div>

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <h2 className="text-4xl font-extrabold mb-4 tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#f470a0] via-pink-500 to-rose-400 drop-shadow-sm">
            ✨ Be Part of Something Beautiful ✨
          </h2>
          <p className="mb-10 text-lg text-gray-700">
            Sign up to get{" "}
            <span className="text-[#f470a0] font-semibold">
              exclusive offers
            </span>
            , early access to launches, and beauty tips that make you glow 💖
          </p>

          <form
            className="space-y-6 bg-white/80 backdrop-blur-lg shadow-xl p-10 rounded-3xl border border-pink-100 hover:shadow-2xl transition-all"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thank you for subscribing! 💌");
              e.target.reset();
            }}
          >
            <input
              type="email"
              placeholder="💌 Enter your email address"
              required
              className="w-full px-5 py-3 border rounded-lg focus:ring-2 focus:ring-[#f470a0] focus:border-pink-400 transition"
            />
            <div className="flex items-center space-x-3 text-left">
              <input
                id="subscribe"
                type="checkbox"
                required
                className="w-5 h-5 border-gray-300 accent-[#f470a0] cursor-pointer"
              />
              <label htmlFor="subscribe" className="text-sm text-gray-600">
                Yes, I want the latest beauty news & offers ✨
              </label>
            </div>
            <button
              type="submit"
              className="w-full md:w-1/3 mx-auto block bg-gradient-to-r from-[#f470a0] via-pink-500 to-rose-400 text-white font-bold py-3 rounded-full shadow-lg hover:shadow-pink-300 hover:scale-105 transition-transform"
            >
              Join Now 💕
            </button>
          </form>
        </div>
      </div>
    </>
  );
}







