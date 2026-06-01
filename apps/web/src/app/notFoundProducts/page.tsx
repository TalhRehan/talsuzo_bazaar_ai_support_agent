import { ShoppingBag, RotateCcw, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function notFoundProducts() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* ── Empty State ── */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20">

        {/* Animated icon */}
        <div className="relative mb-8">
          <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center animate-bounce">
            <ShoppingBag className="w-12 h-12 text-green-600 stroke-[1.5]" />
          </div>
         
        </div>

        {/* Text */}
        <h1 className="text-2xl font-bold text-gray-800 mb-2 text-center">
          No Products Found
        </h1>
        <p className="text-gray-500 text-center max-w-sm mb-8 leading-relaxed">
No products match your current filters.

        </p>
        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link className="flex items-center gap-2 px-6 py-3 rounded-full bg-green-600 text-white font-semibold text-sm hover:bg-green-700 transition-colors" href="/shop">
                      View All Products             <ArrowRight className="w-4 h-4" />

</Link>
         
        </div>
      </main>

      {/* ── Perks Bar ── */}
      <div className="border-t border-gray-200 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-gray-200">

          {[
            {
              icon: (
                <svg className="w-5 h-5 stroke-green-600" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/>
                  <circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                </svg>
              ),
              title: "Free Shipping",
              sub: "On orders over $500",
            },
            {
              icon: <RotateCcw className="w-5 h-5 stroke-green-600" strokeWidth={1.8} />,
              title: "Easy Returns",
              sub: "14-day return policy",
            },
            {
              icon: (
                <svg className="w-5 h-5 stroke-green-600" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              ),
              title: "Secure Payment",
              sub: "100% secure checkout",
            },
            {
              icon: (
                <svg className="w-5 h-5 stroke-green-600" fill="none" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                </svg>
              ),
              title: "24/7 Support",
              sub: "Contact us anytime",
            },
          ].map(({ icon, title, sub }) => (
            <div key={title} className="flex items-center gap-3 px-6 py-5">
              <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                {icon}
              </div>
              <div>
                <p className="text-sm font-600 font-semibold text-gray-800">{title}</p>
                <p className="text-xs text-gray-500">{sub}</p>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
}
