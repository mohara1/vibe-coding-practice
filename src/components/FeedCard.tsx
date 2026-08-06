import Link from "next/link";
import type { FeedItem } from "@/lib/types";
import CategoryBadge from "@/components/CategoryBadge";
import CardPhoto from "@/components/CardPhoto";
import DdayBadge from "@/components/DdayBadge";

export default function FeedCard({ item }: { item: FeedItem }) {
  const href = item.kind === "policy" ? `/policies/${item.id}` : `/spaces/${item.id}`;
  const title = item.kind === "policy" ? item.title : item.name;
  const kindLabel = item.kind === "policy" ? "정책" : "공간";
  const photoName = item.kind === "policy" ? item.title : item.name;

  return (
    <Link
      href={href}
      className="block rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      <div className="flex gap-3">
        <div className="w-16 shrink-0">
          <CardPhoto photoUrl={item.photoUrl} category={item.category} name={photoName} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <CategoryBadge category={item.category} />
            <span className="text-xs text-zinc-400">{kindLabel}</span>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {title}
            </h2>
            {item.kind === "policy" && <DdayBadge applyEnd={item.applyEnd} />}
          </div>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{item.summary}</p>
        </div>
      </div>
    </Link>
  );
}
