import PromoCard from "./PromoCard";

const promos = [
  {
    title: "High—Top Design",
    subtitle: "In-store! Limited time offer.",
    offer: "SAVE 30%–50% CLOTHING",
    imageUrl: "/promo/1.webp",
    link: "/category/clothing",
  },
  {
    title: "Colour Spotlight",
    subtitle: "In-store! Limited time offer.",
    offer: "SAVE 30%–50% BLAZES",
    imageUrl: "/promo/2.webp",
    link: "/category/blazers",
  },
];

export default function PromoSection() {
  return (
    <section className="flex flex-col sm:flex-row gap-4 mt-8 mx-auto max-w-7xl px-6 lg:px-8">
      {promos.map((promo) => (
        <PromoCard key={promo.title} {...promo} />
      ))}
    </section>
  );
}
