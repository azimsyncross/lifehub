"use client";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Clock,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    consent: false,
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success">(
    "idle"
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    setTimeout(() => {
      setStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        consent: false,
      });

      setTimeout(() => setStatus("idle"), 3000); // Reset message after 3s
    }, 2000);
  };

  return (
    <footer className="bg-gradient-to-r from-gray-50 to-gray-100 border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:px-10 lg:px-16">
        {/* Main content with glass effect */}
        {/* <div className="relative rounded-xl overflow-hidden backdrop-blur-sm bg-white/70 shadow-xl p-10 mb-16"> */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 lg:gap-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3 space-y-8"
          >
            <Link href="/" className="block">
              <img
                src="/logo.png"
                alt="Logo"
                width={180}
                height={72}
                className="hover:opacity-80 transition-all duration-500"
              />
            </Link>
            <p className="text-gray-700 text-lg leading-relaxed font-light italic">
              Where timeless elegance meets modern craftsmanship. Curated
              collections for the discerning individual.
            </p>
            <div className="flex space-x-5">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="p-3 bg-white rounded-full shadow-md hover:shadow-lg hover:bg-gray-50 transition-all duration-300"
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Social media link"
                >
                  <Icon className="h-5 w-5 text-gray-800" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Columns */}
          {[
            {
              title: "Discover",
              links: [
                { label: "All Products", href: "/products" },
                { label: "Collections", href: "/collections" },
                { label: "New Arrivals", href: "/new" },
                { label: "Limited Editions", href: "/limited" },
              ],
            },
            {
              title: "Categories",
              links: [
                { label: "Tailored Suits", href: "/suits" },
                { label: "Luxury Footwear", href: "/footwear" },
                { label: "Leather Goods", href: "/leather" },
                { label: "Accessories", href: "/accessories" },
              ],
            },
            {
              title: "Support",
              links: [
                { label: "Client Services", href: "/services" },
                { label: "Appointments", href: "/appointments" },
                { label: "Shipping Policy", href: "/shipping" },
                { label: "Care Instructions", href: "/care" },
              ],
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="md:col-span-3 space-y-6"
            >
              <h4 className="text-sm font-bold tracking-wider text-gray-800 uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gray-400 after:mt-2">
                {section.title}
              </h4>
              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-gray-900 transition-colors duration-300 text-base flex items-center group"
                    >
                      <span className="relative">
                        {link.label}
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300"></span>
                      </span>
                      <motion.span
                        className="ml-2 opacity-0 group-hover:opacity-100"
                        initial={{ x: -5, opacity: 0 }}
                        whileHover={{ x: 0, opacity: 1 }}
                      >
                        ↗
                      </motion.span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact and Newsletter Row - 40/60 Split */}
        <div className="mt-16 pt-12 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8">
            {/* Contact Section - 40% (4 columns out of 10) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-4 bg-gray-900 text-white p-6 rounded-lg shadow-lg h-full"
            >
              <h4 className="text-sm font-bold tracking-wider uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-white/70 after:mt-2 mb-6">
                Contact
              </h4>

              <div className="space-y-5">
                <div className="border-b border-white/10 pb-4">
                  <h5 className="text-lg font-medium mb-2">Amaury Rodriguez</h5>
                  <p className="text-gray-300 text-sm">LifeHub LLC</p>
                </div>

                <div className="space-y-3">
                  <motion.a
                    href="#"
                    className="flex items-center gap-3 group text-gray-200 hover:text-white transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="p-2 bg-white/10 rounded-full">
                      <MapPin className="h-4 w-4" />
                    </div>
                    <span className="text-sm">
                      932 E 232nd St, Bronx, NY 10466, USA
                    </span>
                  </motion.a>

                  <motion.a
                    href="tel:+18459315154"
                    className="flex items-center gap-3 group text-gray-200 hover:text-white transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="p-2 bg-white/10 rounded-full">
                      <Phone className="h-4 w-4" />
                    </div>
                    <span className="text-sm">+1 845 931 5154</span>
                  </motion.a>

                  <motion.a
                    href="mailto:UriahKent9888@hotmail.com"
                    className="flex items-center gap-3 group text-gray-200 hover:text-white transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    <div className="p-2 bg-white/10 rounded-full">
                      <Mail className="h-4 w-4" />
                    </div>
                    <span className="text-sm">UriahKent9888@hotmail.com</span>
                  </motion.a>

                  <motion.div
                    className="flex items-center gap-3 text-gray-200"
                    whileHover={{ x: 4 }}
                  >
                    <div className="p-2 bg-white/10 rounded-full">
                      <Clock className="h-4 w-4" />
                    </div>
                    <span className="text-sm">Mon-Fri: 9am-6pm EST</span>
                  </motion.div>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <button className="bg-white text-gray-900 rounded-full py-2 px-6 text-sm font-medium hover:bg-gray-100 transition-colors w-full flex justify-center items-center gap-2">
                    Get in Touch
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Newsletter Section - 60% (6 columns out of 10) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-6 bg-white p-6 rounded-lg shadow-lg h-full"
            >
              <h4 className="text-sm font-bold tracking-wider text-gray-800 uppercase after:content-[''] after:block after:w-8 after:h-0.5 after:bg-gray-400 after:mt-2 mb-6">
                Stay Connected
              </h4>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Join Our Exclusive Newsletter
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Be the first to know about new collections, exclusive
                    offers, and insider access to private events. Our newsletter
                    members receive special benefits and early access to limited
                    editions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                      required
                    />
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                      required
                    />
                  </div>

                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full py-3 px-5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all"
                    required
                  />

                  <div className="flex items-start space-x-3 mt-2">
                    <input
                      type="checkbox"
                      name="consent"
                      id="newsletter-consent"
                      checked={formData.consent}
                      onChange={handleChange}
                      className="mt-1"
                      required
                    />
                    <label
                      htmlFor="newsletter-consent"
                      className="text-gray-600 text-sm"
                    >
                      I agree to receive news, collections updates, and offers.
                      See our{" "}
                      <Link
                        href="/privacy-policy"
                        className="text-gray-900 underline"
                      >
                        Privacy Policy
                      </Link>{" "}
                      for more details.
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-gray-900 text-white py-3 px-8 rounded-lg hover:bg-gray-800 transition-colors font-medium flex items-center justify-center gap-2 w-full md:w-auto disabled:opacity-60"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? "Submitting..." : "Subscribe Now"}
                  <ArrowRight className="h-4 w-4" />
                </button>

                {status === "success" && (
                  <p className="text-green-600 text-sm font-medium">
                    ✅ You’ve successfully subscribed to our newsletter!
                  </p>
                )}

                <p className="text-gray-500 text-xs italic">
                  We respect your privacy and will never share your information
                  with third parties.
                </p>
              </form>
            </motion.div>
          </div>
        </div>
        {/* </div> */}

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-gray-500 text-sm mt-8"
        >
          <p className="text-center md:text-left font-light">
            © {new Date().getFullYear()} LifeHub LLC
            <span className="mx-3 text-gray-300">|</span>
            All Rights Reserved
          </p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Legal", "Sitemap"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:text-gray-900 transition-colors relative group"
                >
                  <span>{item}</span>
                  <span className="absolute bottom-0 left-0 w-0 h-px bg-gray-400 group-hover:w-full transition-all duration-300"></span>
                </Link>
              )
            )}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
