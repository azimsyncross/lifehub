// ProductGrid.tsx
"use client";

import { Product } from "@/app/types";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

interface ProductGridProps {
  products?: Product[];
  queryParams?: {
    page?: number;
    limit?: number;
    tags?: string[];
    categories?: string[];
    sort?: string;
    search?: string;
  };
}

export default function ProductGrid({
  products = [],
  queryParams,
}: ProductGridProps) {
  const [items, setItems] = useState<Product[]>(products);
  const [loading, setLoading] = useState(!!queryParams);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      if (!queryParams) return;

      try {
        const params = new URLSearchParams();
        if (queryParams.page)
          params.append("page", queryParams.page.toString());
        if (queryParams.limit)
          params.append("limit", queryParams.limit.toString());
        if (queryParams.tags) params.append("tags", queryParams.tags.join(","));
        if (queryParams.categories)
          params.append("categories", queryParams.categories.join(","));
        if (queryParams.sort) params.append("sort", queryParams.sort);
        if (queryParams.search) params.append("search", queryParams.search);

        const queryString = params.toString();
        const url = `/api/products${queryString ? `?${queryString}` : ""}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch products");

        const data = await response.json();
        setItems(data.products);
      } catch (err) {
        setError("Unable to load products. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [queryParams]);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {[...Array(queryParams?.limit || 8)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="aspect-square bg-gray-100 rounded-xl overflow-hidden"
          >
            <div className="animate-pulse h-full w-full" />
          </motion.div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12 space-y-4"
      >
        <div className="text-4xl">😞</div>
        <p className="text-gray-600">{error}</p>
        <Button variant="ghost" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      <AnimatePresence>
        {items.map((product) => (
          <motion.div
            key={product.id}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
