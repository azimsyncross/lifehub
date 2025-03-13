"use client";

import ProductGrid from "@/app/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`/api/categories/${params.slug}`);
        if (!response.ok) throw new Error("Failed to fetch category");
        const data = await response.json();
        setCategory(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-10 w-64" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-square rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center p-8">
        <div className="max-w-md space-y-4">
          <div className="text-4xl">😞</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Category Not Found
          </h2>
          <p className="text-gray-600">
            The category you&apos;re looking for might have been removed or
            renamed.
          </p>
          <Button asChild variant="outline" className="mt-4">
            <Link href="/categories">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Browse Categories
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col gap-8"
      >
        {/* Category Header */}
        <div className="space-y-4">
          <motion.div
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            className="inline-block"
          >
            <Link
              href="/categories"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors group"
            >
              <ArrowLeft className="h-4 w-4 mr-2 transition-transform group-hover:-translate-x-1" />
              All Collections
            </Link>
          </motion.div>

          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl font-serif font-light text-gray-900"
          >
            {category.name}
          </motion.h1>
        </div>

        {/* Product Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <ProductGrid
            queryParams={{
              categories: [category.slug],
              limit: 12,
              sort: "newest",
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}
