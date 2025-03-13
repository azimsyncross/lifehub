import Image from "next/image";
import Link from "next/link";

interface Category {
  title: string;
  itemCount: number;
  image: string;
  href: string;
}

const categories: Category[] = [
  {
    title: "Women's Fashion",
    itemCount: 250,
    image: "/banner/img1.jpg",
    href: "/categories/clothing",
  },
  {
    title: "Men's Fashion",
    itemCount: 180,
    image: "/banner/img2.jpg",
    href: "/categories/running-shoes",
  },
  {
    title: "Must Have",
    itemCount: 120,
    image: "/banner/img3.jpg",
    href: "/categories/footwear",
  },
  {
    title: "Need One More",
    itemCount: 90,
    image: "/banner/img4.jpg",
    href: "/categories/t-shirts",
  },
];

export default function BannerSection(): JSX.Element {
  return (
    <section className="py-16 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <Image
                src={category.image}
                alt={category.title}
                width={400}
                height={500}
                className="w-full h-[350px] object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white p-4 text-center">
                <h3 className="text-2xl font-semibold tracking-wide">
                  {category.title}
                </h3>
                <p className="text-sm opacity-80">{category.itemCount} Items</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
