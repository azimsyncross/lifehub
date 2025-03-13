"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import CategoriesCarousel from "../components/sections/CategoriesCarousel";

interface Category {
  id: string;
  name: string;
  slug: string;
  productCount?: number;
}

const generateGradient = (id: string) => {
  const colors = [
    "from-rose-100/80 to-orange-100/80",
    "from-blue-100/80 to-cyan-100/80",
    "from-purple-100/80 to-pink-100/80",
    "from-green-100/80 to-lime-100/80",
    "from-amber-100/80 to-yellow-100/80",
  ];
  const index = id.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();

        const categoriesWithCount = data.filters.availableCategories.map(
          (category: Category) => ({
            ...category,
            productCount: data.products.filter((product: any) =>
              product.categories.some((cat: any) => cat.id === category.id)
            ).length,
          })
        );

        setCategories(categoriesWithCount);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <CategoriesCarousel />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4 text-center"
          >
            <h1 className="text-4xl font-serif font-light text-gray-900">
              Explore More Collections
            </h1>
            <p className="text-lg text-gray-600">
              Discover our curated product categories
            </p>
          </motion.div>

          {/* Categories Grid */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-xl" />
              ))}
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              <AnimatePresence>
                {categories.map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/categories/${category.slug}`}>
                      <Card className="group relative h-full overflow-hidden rounded-xl border-0 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div
                          className={cn(
                            "absolute inset-0 bg-gradient-to-br",
                            generateGradient(category.id)
                          )}
                        />

                        <CardContent className="relative p-6 h-64 flex flex-col justify-between">
                          <div className="flex justify-between items-start">
                            <div className="space-y-2">
                              <h2 className="text-2xl font-medium text-gray-900">
                                {category.name}
                              </h2>
                              <div className="inline-flex items-center px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-sm font-medium">
                                {category.productCount} Items
                              </div>
                            </div>
                            <div className="p-2 rounded-full bg-white/90 backdrop-blur-sm group-hover:bg-white transition-colors">
                              <ArrowRight className="h-5 w-5 text-gray-600 group-hover:text-gray-900 transition-colors" />
                            </div>
                          </div>

                          {/* Decorative Elements */}
                          <div className="absolute bottom-0 right-0 opacity-10 group-hover:opacity-20 transition-opacity">
                            <div className="text-8xl font-bold text-gray-900">
                              {category.productCount}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
