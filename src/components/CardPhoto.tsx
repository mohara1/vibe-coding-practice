import type { Category } from "@/lib/types";

// 카테고리 바탕색을 그대로 쓴다. 이모지는 아이콘이 아니라 사진 대신이라
// SVG 로 바꾸지 않았다 (docs/requirements.md 4.9).
const placeholderStyles: Record<Category, string> = {
  주거: "bg-housing-soft",
  일자리: "bg-job-soft",
  문화: "bg-culture-soft",
  커뮤니티: "bg-community-soft",
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
  const radiusClass = size === "large" ? "rounded-card" : "rounded-control";

  if (photoUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <img
        src={photoUrl}
        alt={name}
        className={`${dimensionClass} ${radiusClass} w-full object-cover`}
      />
    );
  }

  return (
    <div
      className={`flex ${dimensionClass} ${radiusClass} w-full flex-col items-center justify-center gap-1.5 ${placeholderStyles[category]}`}
    >
      <span className={size === "large" ? "text-4xl" : "text-2xl"}>
        {placeholderIcon[category]}
      </span>
      {size === "large" && (
        <span className="text-[13px] text-slate-600">사진 준비중</span>
      )}
    </div>
  );
}
