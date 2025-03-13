"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Compass, Home, Smile } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Animated 404 Number */}
          <div className="flex justify-center items-center gap-4 mb-8">
            {["4", "0", "4"].map((num, index) => (
              <motion.span
                key={num}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: index * 0.2, type: "spring" }}
                className="text-9xl font-bold text-primary bg-clip-text bg-gradient-to-r from-primary to-blue-600"
              >
                {num}
              </motion.span>
            ))}
          </div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="mb-8 flex justify-center">
              <Compass className="h-16 w-16 text-gray-400" />
            </div>

            <h1 className="text-4xl font-serif font-light text-gray-900 mb-4">
              Lost in Digital Space
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              The page youre looking for has vanished into the digital void.
              Lets navigate back to familiar territory.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="gap-2">
                <Link href="/">
                  <Home className="h-5 w-5" />
                  Return Home
                </Link>
              </Button>
              <Button variant="outline" asChild size="lg" className="gap-2">
                <Link href="/contact">
                  <Smile className="h-5 w-5" />
                  Contact Support
                </Link>
              </Button>
            </div>

            {/* Additional Links */}
            <div className="mt-12 flex justify-center gap-6">
              {["Products", "Collections", "Blog", "About"].map((link) => (
                <Link
                  key={link}
                  href={`/${link.toLowerCase()}`}
                  className="text-gray-600 hover:text-primary transition-colors font-medium"
                >
                  {link}
                </Link>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
