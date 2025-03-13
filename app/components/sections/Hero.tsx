"use client";

import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/slider/slider-1.avif",
    tagline: "New Collection",
    title: "Elevate Your Style",
    description: "Discover our curated selection of premium fashion essentials",
  },
  {
    image: "/slider/slider-2.avif",
    tagline: "Summer Edition",
    title: "Fresh Looks Ahead",
    description: "Experience luxury comfort with our new seasonal designs",
  },
  {
    image: "/slider/slider-3.avif",
    tagline: "Limited Time",
    title: "Exclusive Offers",
    description: "Premium selections with special benefits for members",
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("${slide.image}")` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />

          <div className="relative h-full flex items-center px-8 md:px-16">
            <div className="max-w-2xl space-y-6 text-white">
              <p className="text-lg font-light tracking-widest opacity-90">
                {slide.tagline}
              </p>
              <h1 className="text-5xl font-medium leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl font-light opacity-95">
                {slide.description}
              </p>
              <div className="flex gap-4 mt-8">
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur-sm hover:bg-white/40 border border-white/20"
                  asChild
                >
                  <Link href="/products">Explore Collection</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-pink-600 backdrop-blur-sm text-white hover:bg-pink-400"
                  asChild
                >
                  <Link href="/sale">View Offers</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Controls */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-2.5 w-8 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-pink-600 w-10" : "bg-white/30"
            }`}
          />
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 animate-bounce">
        <div className="flex flex-col items-center text-white">
          <span className="text-sm mb-2">Scroll</span>
          <ChevronDown className="h-6 w-6 text-pink-600" />
        </div>
      </div>
    </section>
  );
}
