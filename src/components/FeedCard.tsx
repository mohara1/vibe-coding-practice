import Link from "next/link";
import type { FeedItem } from "@/lib/types";
import CategoryBadge from "@/components/CategoryBadge";
import CardPhoto from "@/components/CardPhoto";
import DdayBadge from "@/components/DdayBadge";
import FavoriteButton from "@/components/FavoriteButton";

export default function FeedCard({ item }: { item: FeedItem }) {
  const href = item.kind === "policy" ? `/policies/${item.id}` : `/spaces/${item.id}`;
  const title = item.kind === "policy" ? item.title : item.name;
  const kindLabel = item.kind === "policy" ? "정책" : "공간";
  const photoName = item.kind === "policy" ? item.title : item.name;

  return (
    <Link
      href={href}
      className="relative block rounded-card border border-slate-200 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
    >
      <FavoriteButton kind={item.kind} id={item.id} className="absolute right-3 top-3" />

      <div className="flex gap-3.5">
        <div className="w-16 shrink-0">
          <CardPhoto photoUrl={item.photoUrl} category={item.category} name={photoName} />
        </div>

        <div className="min-w-0 flex-1 pr-8">
          <div className="flex items-center gap-2">
            <CategoryBadge category={item.category} />
            <span className="text-[13px] text-slate-500">{kindLabel}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <h2 className="text-base font-semibold text-hamo-900">{title}</h2>
            <DdayBadge applyEnd={item.applyEnd} />
          </div>
          {/* 한 줄 요약이 이 서비스의 심장이다 (docs/requirements.md 4.10) */}
          <p className="mt-1.5 text-[15px] leading-relaxed text-slate-600">
            {item.summary}
          </p>
        </div>
      </div>
    </Link>
  );
}
