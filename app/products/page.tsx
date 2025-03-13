"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import ProductFilters from "../components/products/ProductFilters";
import ProductGrid from "../components/products/ProductGrid";

function ProductsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState(searchQuery);

  // ... existing useEffect hooks ...
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (debouncedSearchQuery) {
      params.set("search", debouncedSearchQuery);
    } else {
      params.delete("search");
    }
    router.push(`/products?${params.toString()}`);
  }, [debouncedSearchQuery, router, searchParams]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-8"
      >
        {/* Header Section */}
        <div className="space-y-2">
          <h1 className="text-4xl font-serif font-light text-gray-900">
            Curated Collection
          </h1>
          <p className="text-lg text-gray-600">
            Discover our premium selection of artisan-crafted Cloths, footwear
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex gap-4 items-center sticky top-0 bg-white/95 backdrop-blur-sm z-10 py-4">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-xl text-lg border-2 border-gray-200 focus-visible:ring-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>

          {/* Mobile Filters Button */}
          <Sheet onOpenChange={setIsMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="lg:hidden h-12 px-6 rounded-xl"
              >
                <SlidersHorizontal className="h-5 w-5 mr-2" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[320px]">
              <SheetHeader className="border-b pb-4">
                <SheetTitle className="text-2xl">Filter Collection</SheetTitle>
              </SheetHeader>
              <ProductFilters className="mt-4" />
            </SheetContent>
          </Sheet>
        </div>

        {/* Main Content Grid */}
        <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
          {/* Desktop Filters */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden lg:block"
          >
            <div className="sticky top-24 space-y-8 border-r pr-6">
              <ProductFilters />
            </div>
          </motion.div>

          {/* Product Grid Area */}
          <ProductGrid
            queryParams={{
              search: debouncedSearchQuery,
              categories: searchParams.getAll("category"),
              tags: searchParams.getAll("tag"),
              sort: searchParams.get("sort") as any,
              page: Number(searchParams.get("page")) || 1,
              limit: 20,
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Skeleton Loading Component
function LoadingSkeleton() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-6 w-96" />
      </div>

      <div className="flex gap-4">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 w-32" />
      </div>

      <div className="lg:grid lg:grid-cols-[280px_1fr] gap-8">
        <div className="hidden lg:block space-y-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-6 w-24" />
              {[...Array(3)].map((_, j) => (
                <Skeleton key={j} className="h-5 w-full" />
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square rounded-xl" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-5 w-24" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Main component with Suspense
export default function ProductsPage() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <ProductsContent />
    </Suspense>
  );
}
