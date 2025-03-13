import Link from "next/link";

type PromoCardProps = {
  title: string;
  subtitle: string;
  offer: string;
  imageUrl: string;
  link: string;
};

export default function PromoCard({
  title,
  subtitle,
  offer,
  imageUrl,
  link,
}: PromoCardProps) {
  return (
    <Link
      href={link}
      className="relative group overflow-hidden rounded-2xl aspect-[2/1] w-full sm:w-[48%] transition-shadow hover:shadow-lg"
    >
      <img
        src={imageUrl}
        alt={title}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-4 z-10">
        <p className="text-sm text-white/80 font-light">{offer}</p>
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="text-sm text-white/90">{subtitle}</p>
      </div>
    </Link>
  );
}
