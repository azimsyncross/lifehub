// ProductImageGallery.tsx
"use client";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useState } from "react";
interface ProductImageGalleryProps {
  images: Array<{
    url: string;
    alt: string;
    isMain?: boolean;
  }>;
}

export default function ProductImageGallery({
  images,
}: ProductImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(
    images.find((img) => img.isMain) || images[0]
  );
  const [isZoomed, setIsZoomed] = useState(false);

  return (
    <div className="space-y-6">
      {/* Main Image */}
      <Dialog>
        <DialogTrigger asChild>
          <motion.div
            className="relative aspect-square rounded-xl overflow-hidden cursor-zoom-in bg-gray-100"
            whileHover="hover"
          >
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 75vw"
            />
            <motion.div
              className="absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm"
              variants={{
                hover: { opacity: 1 },
                initial: { opacity: 0 },
              }}
            >
              <Expand className="h-5 w-5" />
            </motion.div>
          </motion.div>
        </DialogTrigger>

        {/* Fullscreen View */}
        <DialogContent className="max-w-[90vw] h-[90vh] p-0 bg-white">
          <div className="relative w-full h-full">
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>

      {/* Thumbnail Carousel */}
      <div className="grid grid-cols-4 gap-4">
        {images.map((image, idx) => (
          <motion.button
            key={idx}
            onClick={() => setSelectedImage(image)}
            className={cn(
              "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
              selectedImage.url === image.url
                ? "border-black"
                : "border-transparent hover:border-gray-300"
            )}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="object-cover object-center"
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
