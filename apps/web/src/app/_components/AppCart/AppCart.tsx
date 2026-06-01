"use client";

import { FaApple, FaGooglePlay } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AppCart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 80 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="bg-[#eef7f3] mx-3 sm:mx-5 mt-7 rounded-3xl p-5 sm:p-8 lg:p-10 flex flex-col lg:flex-row gap-8 lg:gap-10 items-center justify-between shadow-sm"
    >

      <div className="flex-1 w-full max-w-xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="bg-green-600 text-white p-3 rounded-xl shadow shrink-0">
            ✉️
          </div>
          <div>
            <p className="text-green-600 font-semibold text-sm tracking-wide">
              NEWSLETTER
            </p>
            <p className="text-sm text-gray-500">
              50,000+ subscribers
            </p>
          </div>
        </div>

        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 leading-snug mb-4">
          Get TalSuzo Updates{" "}
          <br className="hidden sm:block" />
          <span className="text-green-600">Delivered Free</span>
        </h2>

        <p className="text-gray-500 mb-6 text-sm">
          Weekly recipes, seasonal offers & exclusive member perks.
        </p>

        {/* TAGS */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-6">
          {[
            "New Picks Weekly",
            "Free Delivery Codes",
            "Members-Only Deals",
          ].map((tag, i) => (
            <span
              key={i}
              className="px-3 sm:px-4 py-2 bg-white rounded-full text-xs sm:text-sm shadow-sm border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* INPUT */}
        <div className="flex flex-col xs:flex-row gap-3 mb-2">
          <input
            type="email"
            placeholder="you@example.com"
            className="flex-1 p-3 sm:p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-green-500 text-sm"
          />
          <button className="bg-green-600 text-white px-5 sm:px-6 py-3 sm:py-0 rounded-xl hover:bg-green-700 transition font-medium text-sm whitespace-nowrap">
            Subscribe
          </button>
        </div>

        <p className="text-xs text-gray-400">
          Unsubscribe anytime. No spam, ever.
        </p>
      </div>

      <div className="w-full lg:flex-1 lg:max-w-md">
        <div className="bg-gradient-to-br from-[#0f172a] to-[#064e3b] text-white rounded-3xl p-5 sm:p-7 shadow-lg">
          <span className="bg-green-600 text-xs px-3 py-1 rounded-full inline-block mb-4">
            MOBILE APP
          </span>

          <h3 className="text-xl sm:text-2xl font-semibold mb-2">
            Shop Faster on Our App
          </h3>

          <p className="text-sm text-gray-300 mb-5">
            Get app-exclusive deals & 15% off your first order.
          </p>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 mb-5">
            <button className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-3 rounded-xl hover:bg-white/20 transition flex-1">
              <FaApple className="text-lg shrink-0" />
              <span className="text-sm font-medium">Download on App Store</span>
            </button>

            <button className="flex items-center gap-3 bg-white/10 backdrop-blur px-4 py-3 rounded-xl hover:bg-white/20 transition flex-1">
              <FaGooglePlay className="text-lg shrink-0" />
              <span className="text-sm font-medium">Get it on Google Play</span>
            </button>
          </div>

          <p className="text-sm text-yellow-400">
            5 stars{" "}
            <span className="text-gray-300">4.9 - 100K+ downloads</span>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
