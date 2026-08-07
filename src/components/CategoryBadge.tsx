import type { Category } from "@/lib/types";

// 하모 톤으로 재조율한 4색. 값과 근거는 docs/requirements.md 4.3 절.
// 넷 다 바탕 밝기 ~92% / 글자 ~35% 로 같은 층에 놓아 한 시스템으로 읽히게 했다.
const styles: Record<Category, string> = {
  주거: "bg-housing-soft text-housing-ink",
  일자리: "bg-job-soft text-job-ink",
  문화: "bg-culture-soft text-culture-ink",
  커뮤니티: "bg-community-soft text-community-ink",
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
