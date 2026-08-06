import type { Category } from "@/lib/types";

const styles: Record<Category, string> = {
  주거: "bg-blue-100 text-blue-700",
  일자리: "bg-emerald-100 text-emerald-700",
  문화: "bg-purple-100 text-purple-700",
  커뮤니티: "bg-orange-100 text-orange-700",
};

export default function CategoryBadge({ category }: { category: Category }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${styles[category]}`}
    >
      {category}
    </span>
  );
}
