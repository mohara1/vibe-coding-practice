import type { Category } from "@/lib/types";

const placeholderStyles: Record<Category, string> = {
  주거: "bg-blue-50 text-blue-400 dark:bg-blue-950",
  일자리: "bg-emerald-50 text-emerald-400 dark:bg-emerald-950",
  문화: "bg-purple-50 text-purple-400 dark:bg-purple-950",
  커뮤니티: "bg-orange-50 text-orange-400 dark:bg-orange-950",
};

const placeholderIcon: Record<Category, string> = {
  주거: "🏠",
  일자리: "💼",
  문화: "🎨",
  커뮤니티: "🤝",
};

export default function CardPhoto({
  photoUrl,
  category,
  name,
  size = "thumb",
}: {
  photoUrl: string | null;
  category: Category;
  name: string;
  size?: "thumb" | "large";
}) {
  const dimensionClass = size === "large" ? "aspect-[4/3]" : "aspect-square";

  if (photoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`${dimensionClass} w-full rounded-lg object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex ${dimensionClass} w-full flex-col items-center justify-center gap-1 rounded-lg ${placeholderStyles[category]}`}
    >
      <span className={size === "large" ? "text-4xl" : "text-2xl"}>
        {placeholderIcon[category]}
      </span>
      {size === "large" && <span className="text-xs">사진 준비중</span>}
    </div>
  );
}
