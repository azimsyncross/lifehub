"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

const categories = [
  {
    id: "dresses",
    name: "Dresses",
    image: "/categories/fs_t1.webp",
    banner: "/categories/b5.webp",
    description: "Elegant styles for every occasion",
    link: "/categories/dresses",
    color: "bg-rose-100",
  },
  {
    id: "t-shirts",
    name: "T-Shirts",
    image: "/categories/fs_t2.webp",
    banner: "/categories/b1.webp",
    description: "Classic and contemporary designs",
    link: "/categories/shirts",
    color: "bg-indigo-100",
  },
  {
    id: "blazers",
    name: "Blazers",
    image: "/categories/fsr_clt5.webp",
    banner: "/categories/b2.webp",
    description: "Performance meets style",
    link: "/categories/sportswear",
    color: "bg-amber-100",
  },
  {
    id: "sweaters",
    name: "Sweaters",
    image: "/categories/fs_t6.webp",
    banner: "/categories/b4.webp",
    description: "Cozy and fashionable layers",
    link: "/categories/sweaters",
    color: "bg-teal-100",
  },
  {
    id: "tshirts",
    name: "Top T-Shirt",
    image: "/categories/fsr_clt4.webp",
    banner: "/categories/b3.webp",
    description: "Essential everyday pieces",
    link: "/categories/tshirts",
    color: "bg-sky-100",
  },
];

export default function CategoriesCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [direction, setDirection] = useState("next");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartX = useRef(0);

  const handleNext = () => {
    setDirection("next");
    setActiveIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setDirection("prev");
    setActiveIndex(
      (prev) => (prev - 1 + categories.length) % categories.length
    );
  };

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    if (autoplay) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => handleNext(), 5000);
    }
    return () => resetTimeout();
  }, [activeIndex, autoplay]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      diff > 0 ? handleNext() : handlePrev();
    }
  };

  const springConfig = {
    type: "spring",
    damping: 25,
    stiffness: 120,
    mass: 0.5,
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-light text-gray-900 mb-4"
          >
            Curated Collections
          </motion.h2>
          <p className="text-lg text-gray-600">
            Discover our carefully selected categories of premium apparel
          </p>
        </div>

        <div
          className="relative group h-[600px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={activeIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction === "next" ? 100 : -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction === "next" ? -100 : 100 }}
              transition={springConfig}
              className="absolute inset-0"
            >
              <div className="relative h-full rounded-3xl overflow-hidden shadow-xl">
                <img
                  src={categories[activeIndex].banner}
                  alt={categories[activeIndex].name}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                  <div className="max-w-2xl mx-auto">
                    <div
                      className={`${categories[activeIndex].color} p-6 rounded-2xl backdrop-blur-sm bg-opacity-20`}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-white"
                      >
                        <h3 className="text-4xl font-serif font-light mb-4">
                          {categories[activeIndex].name}
                        </h3>
                        <p className="text-lg font-light mb-6">
                          {categories[activeIndex].description}
                        </p>
                        <Link
                          href={categories[activeIndex].link}
                          className="inline-flex items-center px-8 py-3 bg-white/90 text-gray-900 font-medium rounded-lg hover:bg-white transition-all"
                        >
                          Explore Collection
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <button
            onClick={handlePrev}
            className="absolute left-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all text-white shadow-lg hover:shadow-xl"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-8 top-1/2 -translate-y-1/2 z-20 p-4 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-all text-white shadow-lg hover:shadow-xl"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Progress Indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
            <div className="flex gap-2">
              {categories.map((_, index) => (
                <div
                  key={index}
                  className={`h-1 rounded-full transition-all duration-1000 ${
                    index === activeIndex ? "w-8 bg-white" : "w-4 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 z-20">
            <div className="flex gap-4">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  onClick={() => {
                    setDirection(index > activeIndex ? "next" : "prev");
                    setActiveIndex(index);
                  }}
                  whileHover={{ scale: 1.05 }}
                  className={`relative h-20 w-20 rounded-2xl overflow-hidden shadow-lg ${
                    index === activeIndex
                      ? "ring-2 ring-offset-2 ring-white scale-110"
                      : "opacity-80 hover:opacity-100"
                  } transition-all`}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover"
                  />
                  <div
                    className={`absolute inset-0 ${
                      index === activeIndex ? "bg-black/20" : "bg-black/40"
                    }`}
                  />
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
