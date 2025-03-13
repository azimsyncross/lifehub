import PromoSection from "./components/promo/PromoSection";
import BannerSection from "./components/sections/BannerSection";
import BestSellers from "./components/sections/BestSellers";
import CategoriesCarousel from "./components/sections/CategoriesCarousel";
import FeaturedProducts from "./components/sections/FeaturedProducts";
import Hero from "./components/sections/Hero";

export default function Home() {
  return (
    <div>
      <Hero />

      <CategoriesCarousel />
      <FeaturedProducts />
      <PromoSection />
      <BannerSection />
      <BestSellers />
    </div>
  );
}
