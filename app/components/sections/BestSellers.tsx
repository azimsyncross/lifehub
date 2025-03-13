import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductGrid from "../products/ProductGrid";

export default function BestSellers() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-serif font-light text-gray-900 mb-4">
            Best seller
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover artisanal craftsmanship in our premium Product selection
          </p>
        </div>
        <ProductGrid
          queryParams={{
            tags: ["bestSeller", "premium", "stylish2"],
            limit: 6,
            sort: "name_desc",
          }}
        />
        <div className="mt-12 text-center">
          <Button variant="outline" size="lg" asChild>
            <Link href="/products" className="font-medium">
              View All Collections →
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
