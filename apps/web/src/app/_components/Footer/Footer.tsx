import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import { FiPhone, FiMail, FiMapPin } from "react-icons/fi";
import { BsCreditCard2Front } from "react-icons/bs";
import { FaTruck, FaUndo, FaShieldAlt, FaHeadphones } from "react-icons/fa";

function FooterColumn({
  title,
  links,
}: {
  title: string
  links: string[]
}) {
  return (
    <div>
      <h3 className="text-white font-semibold text-base mb-5">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-sm text-gray-400 hover:text-green-400 transition-colors"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TalSuzoBazaarFooter() {
  const shopLinks = [
    "All Products",
    "Categories",
    "Brands",
    "Electronics",
    "Men's Fashion",
    "Women's Fashion",
  ];

  const accountLinks = [
    "My Account",
    "Order History",
    "Wishlist",
    "Shopping Cart",
    "Sign In",
    "Create Account",
  ];

  const supportLinks = [
    "Contact Us",
    "Help Center",
    "Shipping Info",
    "Returns & Refunds",
    "Track Order",
  ];

  const legalLinks = ["Privacy Policy", "Terms of Service", "Cookie Policy"];

  return (

<>
    <div className="bg-green-50 py-6 mt-10">
  <div className="max-w-6xl  mx-3 px-4  flex justify-between grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 ">

    {/* Item 1 */}
    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaTruck/>
      </div>
      <div>
        <h4 className="font-semibold text-gray-800">Free Shipping</h4>
        <p className="text-sm text-gray-500">On orders over $500</p>
      </div>
    </div>

    {/* Item 2 */}
    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaUndo/>
      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">Easy Returns</h4>
        <p className="text-sm text-gray-500">14-day return policy</p>
      </div>
    </div>

    {/* Item 3 */}
    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaShieldAlt/>
      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">Secure Payment</h4>
        <p className="text-sm text-gray-500">100% secure checkout</p>
      </div>
    </div>

    {/* Item 4 */}
    <div className="flex items-center gap-3">
      <div className="bg-green-100 p-3 rounded-xl">
        <FaHeadphones/>
      </div>
      <div>
        <h4 className="font-semibold text-sm text-gray-800">24/7 Support</h4>
        <p className="text-sm text-gray-500">Contact us anytime</p>
      </div>
    </div>

  </div>
</div>
    <footer className="bg-[#1a2332] text-gray-300">
      <div className="max-w-7xl  ms-9 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          <div className="lg:col-span-1">
            <div className="inline-flex items-center gap-2 border border-gray-500 rounded-md px-4 py-2 mb-5">
              <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
                <rect width="40" height="40" rx="6" fill="#22c55e" opacity="0.15" />
                <path
                  d="M8 10h4l5 14h10l4-10H14"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle cx="17" cy="28" r="2" fill="#22c55e" />
                <circle cx="27" cy="28" r="2" fill="#22c55e" />
              </svg>
              <span className="text-white font-bold text-xl tracking-tight">TalSuzo Bazaar</span>
            </div>

            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              TalSuzo Bazaar is your one-stop destination for quality products. From fashion to
              electronics, we bring you the best brands at competitive prices with a seamless
              shopping experience.
            </p>

            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-center gap-3">
                <FiPhone className="text-green-500 shrink-0" size={16} />
                <span>+1 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="text-green-500 shrink-0" size={16} />
                <span>support@talsuzobazaar.com</span>
              </li>
              <li className="flex items-center gap-3">
                <FiMapPin className="text-green-500 shrink-0" size={16} />
                <span>123 Commerce Street, New York, NY 10001</span>
              </li>
            </ul>

            <div className="flex gap-3">
              {[
                { icon: <FaFacebookF size={14} />, label: "Facebook" },
                { icon: <FaTwitter size={14} />, label: "Twitter" },
                { icon: <FaInstagram size={14} />, label: "Instagram" },
                { icon: <FaYoutube size={14} />, label: "YouTube" },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:border-green-500 hover:text-green-500 transition-colors"
                >
                  {icon}
                </button>
              ))}
            </div>
          </div>

          <FooterColumn title="Shop" links={shopLinks} />

          <FooterColumn title="Account" links={accountLinks} />

          <FooterColumn title="Support" links={supportLinks} />

          <FooterColumn title="Legal" links={legalLinks} />
        </div>
      </div>

      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; 2026 TalSuzo Bazaar. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-gray-500">
            <div className="flex items-center gap-1.5">
              <BsCreditCard2Front size={18} />
              <span className="text-sm font-medium">Visa</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BsCreditCard2Front size={18} />
              <span className="text-sm font-medium">Mastercard</span>
            </div>
            <div className="flex items-center gap-1.5">
              <BsCreditCard2Front size={18} />
              <span className="text-sm font-medium">PayPal</span>
            </div>
          </div>
        </div>
      </div>
    </footer></>
  );
}
