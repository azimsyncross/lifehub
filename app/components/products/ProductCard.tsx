// ProductCard.tsx
"use client";

import { useShopping } from "@/app/contexts/shopping-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    basePrice: number;
    images: Array<{
      url: string;
      alt: string;
    }>;
    [key: string]: any;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToWishlist, removeFromWishlist, wishlist, addToCart } =
    useShopping();
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    isInWishlist ? removeFromWishlist(product.id) : addToWishlist(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const defaultSize = product.size[0];
    addToCart(product, defaultSize);
  };

  return (
    <div className="group relative block overflow-hidden rounded-xl bg-gray-100 shadow-sm">
      {/* Product Image + Link */}
      <Link href={`/products/${product.slug}`}>
        <motion.div
          whileHover="hover"
          className="relative aspect-square w-full"
        >
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Hover Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />

          {/* Sale Badge */}
          {product.onSale && (
            <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
              Sale
            </div>
          )}
        </motion.div>
      </Link>

      {/* Wishlist Button */}
      <button
        onClick={toggleWishlist}
        className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all z-10"
        aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
      >
        <motion.div
          animate={{ scale: isInWishlist ? [1, 1.2, 1] : 1 }}
          transition={{ duration: 0.3 }}
        >
          <Heart
            className={cn(
              "h-5 w-5 transition-colors",
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            )}
          />
        </motion.div>
      </button>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-base font-semibold text-gray-800 line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600">${product.basePrice.toFixed(2)}</p>

        {/* Add to Cart Button */}
        <Button
          onClick={handleAddToCart}
          size="sm"
          className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
        >
          <ShoppingBag className="mr-2 h-4 w-4" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
