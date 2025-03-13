// ProductPage.tsx
"use client";

import ProductImageGallery from "@/app/components/products/ProductImageGallery";
import RelatedProducts from "@/app/components/products/RelatedProducts";
import { useShopping } from "@/app/contexts/shopping-context";
import { Product } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowLeftCircle,
  Heart,
  Ruler,
  ShoppingBag,
  Star,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProductPage({ params }: { params: { slug: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [showSizeError, setShowSizeError] = useState(false);
  const { addToCart, addToWishlist, removeFromWishlist, wishlist } =
    useShopping();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch product");
        const data = await response.json();
        const foundProduct = data.products.find(
          (product: Product) => product.slug === params.slug
        );
        if (foundProduct) {
          setProduct(foundProduct);
          // Set related products here
          const related =
            foundProduct.categories?.flatMap((category: { id: string }) =>
              data.products.filter(
                (p: Product) =>
                  p.id !== foundProduct.id &&
                  p.categories?.some(
                    (c: { id: string }) => c.id === category.id
                  )
              )
            ) || [];
          setRelatedProducts(related.slice(0, 4));
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.slug]);

  // Loading Skeleton
  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="mb-6">
          <Skeleton className="h-4 w-32" />
        </div>

        <div className="lg:grid lg:grid-cols-2 lg:gap-x-8">
          {/* Image Gallery Skeleton */}
          <div className="space-y-6">
            <Skeleton className="aspect-square rounded-xl" />
            <div className="grid grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0 space-y-8">
            <div className="space-y-4">
              <Skeleton className="h-9 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-5 w-20" />
                <Skeleton className="h-5 w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-6 w-1/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="space-y-4">
              <Skeleton className="h-11 w-full" />
              <Skeleton className="h-11 w-full" />
            </div>

            <div className="space-y-2">
              {[...Array(3)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (!product) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex flex-col items-center justify-center text-center p-8"
      >
        <div className="max-w-md space-y-6">
          <div className="text-6xl">😞</div>
          <h2 className="text-3xl font-bold text-gray-900">
            Product Not Found
          </h2>
          <p className="text-gray-600">
            The item you&apos;re looking for might be unavailable or moved to
            another collection.
          </p>
          <Button asChild className="mt-4">
            <Link href="/products">
              <ArrowLeftCircle className="mr-2 h-4 w-4" />
              Browse Products
            </Link>
          </Button>
        </div>
      </motion.div>
    );
  }
  const isInWishlist = wishlist.some((item) => item.id === product.id);

  const discount = product.compareAtPrice
    ? Math.round(
        ((product.compareAtPrice - product.basePrice) /
          product.compareAtPrice) *
          100
      )
    : 0;

  const handleAddToCart = () => {
    addToCart(product, 1);
    setShowSizeError(false);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Collection
        </Link>
      </div>

      <div className="lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
        {/* Product Images */}
        <div className="sticky top-24 self-start">
          <ProductImageGallery images={product.images} />
        </div>

        {/* Product Info */}
        <div className="mt-8 lg:mt-0 space-y-8">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Header */}
            <div className="space-y-4 border-b pb-8">
              <div className="flex justify-between items-start gap-4">
                <h1 className="text-4xl font-serif font-light tracking-wide text-gray-900">
                  {product.name}
                </h1>
                <button
                  onClick={() =>
                    isInWishlist
                      ? removeFromWishlist(product.id)
                      : addToWishlist(product)
                  }
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label={
                    isInWishlist ? "Remove from wishlist" : "Add to wishlist"
                  }
                >
                  <Heart
                    className={cn(
                      "h-6 w-6",
                      isInWishlist
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    )}
                  />
                </button>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 bg-gray-100 px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-medium">
                    {product.averageRating} ({product.totalReviews})
                  </span>
                </div>
                {product.categories?.map((category) => (
                  <Badge
                    key={category.id}
                    variant="outline"
                    className="border-gray-200 bg-white/50 backdrop-blur-sm"
                  >
                    {category.name}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Pricing */}
            <div className="pt-8 space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-medium">
                  ${product.basePrice}
                </span>
                {product.compareAtPrice && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      ${product.compareAtPrice}
                    </span>
                    <Badge
                      variant="outline"
                      className="bg-green-100 text-green-800"
                    >
                      Save {discount}%
                    </Badge>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Truck className="h-5 w-5" />
                <span>Free expedited shipping on orders over $200</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="space-y-4 pt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium">Select Size</h3>
                <Link
                  href="#size-guide"
                  className="text-sm flex items-center gap-1 text-gray-600 hover:text-gray-900"
                >
                  <Ruler className="h-4 w-4" />
                  Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {product.size?.map((size) => (
                  <button
                    key={size}
                    onClick={() => {
                      setSelectedSize(size.toString());
                      setShowSizeError(false);
                    }}
                    className={cn(
                      "border-2 p-3 rounded-lg text-sm font-medium transition-all",
                      selectedSize === size.toString()
                        ? "border-black bg-black text-white"
                        : "border-gray-200 hover:border-gray-400",
                      showSizeError && "border-red-500"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
              {showSizeError && (
                <p className="text-sm text-red-500">
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="space-y-4 pt-8">
              <Button
                size="lg"
                className="w-full gap-2 py-4"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-5 w-5" />
                Add to Cart
              </Button>
            </div>

            {/* Description */}
            <div className="pt-8 space-y-4">
              <h3 className="text-lg font-medium">Product Details</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Tags */}
            <div className="pt-8 space-y-4">
              <h3 className="text-lg font-medium">Product Tags</h3>
              <div className="flex flex-wrap gap-2">
                {product.tags?.map((tag) => (
                  <Badge
                    key={tag}
                    variant="outline"
                    className="bg-gray-100 text-gray-600"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Related Products */}
      <div className="pt-16">
        <h3 className="text-2xl font-serif font-light mb-8">
          Complete the Look
        </h3>
        <RelatedProducts products={relatedProducts} />
      </div>
    </div>
  );
}
