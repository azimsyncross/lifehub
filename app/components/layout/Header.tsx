"use client";

import { useAuth } from "@/app/contexts/auth-context";
import { useShopping } from "@/app/contexts/shopping-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const { user, logout } = useAuth();
  const { cartItemsCount, wishlistItemsCount } = useShopping();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full top-0 left-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-sm shadow-sm" : "bg-black/50"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-50">
            {isScrolled ? (
              <img
                src="/logo.png"
                alt="Logo"
                width={160}
                height={40}
                className="transition-all duration-300"
              />
            ) : (
              <img
                src="/logo-1.png"
                alt="Logo"
                width={160}
                height={40}
                className="transition-all duration-300"
              />
            )}
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/products"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white font-bold hover:text-white"
              }`}
            >
              Products
            </Link>
            <Link
              href="/categories"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white font-bold hover:text-white"
              }`}
            >
              Categories
            </Link>
            <Link
              href="/about"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white font-bold hover:text-white"
              }`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`text-sm font-medium transition-colors ${
                isScrolled
                  ? "text-gray-600 hover:text-gray-900"
                  : "text-white font-bold hover:text-white"
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="relative">
              <Heart
                className={`h-5 w-5 transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white font-bold hover:text-white"
                }`}
              />
              {wishlistItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 px-2 py-0.5 bg-pink-500 text-white">
                  {wishlistItemsCount}
                </Badge>
              )}
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingBag
                className={`h-5 w-5 transition-colors ${
                  isScrolled
                    ? "text-gray-600 hover:text-gray-900"
                    : "text-white font-bold hover:text-white"
                }`}
              />
              {cartItemsCount > 0 && (
                <Badge className="absolute -top-2 -right-2 px-2 py-0.5 bg-pink-500 text-white">
                  {cartItemsCount}
                </Badge>
              )}
            </Link>
            {user ? (
              <Button
                variant={isScrolled ? "default" : "outline"}
                size="sm"
                onClick={logout}
                className={
                  !isScrolled ? "bg-white/10 hover:bg-white/20 text-black" : ""
                }
              >
                Logout
              </Button>
            ) : (
              <Button
                asChild
                variant={isScrolled ? "default" : "outline"}
                size="sm"
                className={
                  !isScrolled ? "bg-white/10 hover:bg-white/20 text-black" : ""
                }
              >
                <Link href="/auth">Login</Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
