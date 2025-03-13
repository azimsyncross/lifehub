"use client";
import { motion } from "framer-motion";
import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA] border-t border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-20 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-14 lg:gap-24">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="col-span-2 space-y-6"
          >
            <Link href="/" className="block">
              <Image
                src="/logo.png"
                alt="Logo"
                width={200}
                height={80}
                className="hover:opacity-80 transition-opacity duration-300"
              />
            </Link>
            <p className="text-gray-600 text-[17px] leading-relaxed">
              Where timeless elegance meets modern craftsmanship. Curated
              collections for the discerning individual.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                <motion.a
                  key={idx}
                  href="#"
                  className="p-2.5 bg-white rounded-full shadow hover:shadow-md transition-all"
                  whileHover={{ scale: 1.1 }}
                  aria-label="Social media link"
                >
                  <Icon className="h-5 w-5 text-gray-700" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation & Contact */}
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
            {
              title: "Contact",
              content: (
                <div className="space-y-3 text-gray-600 text-[15px] leading-relaxed">
                  <p className="font-semibold text-gray-900 text-[16px]">
                    Amaury Rodriguez
                  </p>
                  <p className="font-semibold text-gray-900 text-[16px]">
                    LifeHub LLC
                  </p>
                  <address className="not-italic">
                    932 E 232nd St
                    <br />
                    Bronx, NY 10466
                    <br />
                    United States
                  </address>
                  <p>
                    <a
                      href="tel:+18459315154"
                      className="hover:text-gray-900 transition-colors"
                    >
                      +1 845 931 5154
                    </a>
                  </p>
                  <p>
                    <a
                      href="mailto:UriahKent9888@hotmail.com"
                      className="hover:text-gray-900 transition-colors"
                    >
                      UriahKent9888@hotmail.com
                    </a>
                  </p>
                </div>
              ),
            },
          ].map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="space-y-6"
            >
              <h4 className="text-sm font-semibold tracking-wide text-gray-800 uppercase">
                {section.title}
              </h4>
              {section.links ? (
                <ul className="space-y-4">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="text-gray-600 hover:text-gray-900 transition-colors text-[15px] flex items-center group"
                      >
                        {link.label}
                        <span className="ml-2 text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                          ↗
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                section.content
              )}
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="my-14 border-t border-gray-200"
        />

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-600 text-sm"
        >
          <p className="text-center md:text-left">
            © {new Date().getFullYear()} LifeHub LLC
            <span className="mx-2">|</span>
            All Rights Reserved
          </p>
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Legal"].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="hover:text-gray-900 transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
