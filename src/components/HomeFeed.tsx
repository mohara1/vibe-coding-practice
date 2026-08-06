"use client";

import { useMemo, useState } from "react";
import type { Category, FeedItem, Status } from "@/lib/types";
import FeedCard from "@/components/FeedCard";

const CATEGORIES: Category[] = ["주거", "일자리", "문화", "커뮤니티"];
const STATUSES: Status[] = ["대학생", "직장인"];

export default function HomeFeed({ items }: { items: FeedItem[] }) {
  const [category, setCategory] = useState<Category | "전체">("전체");
  const [status, setStatus] = useState<Status | "전체">("전체");

  const filtered = useMemo(() => {
    return items.filter((item) => {
      const matchesCategory = category === "전체" || item.category === category;
      if (!matchesCategory) return false;

      if (item.kind === "policy" && status !== "전체") {
        return item.targetStatus.length === 0 || item.targetStatus.includes(status);
      }
      return true;
    });
  }, [items, category, status]);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {(["전체", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              category === c
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <span className="text-xs text-zinc-500">나는 지금</span>
        {(["전체", ...STATUSES] as const).map((s) => (
          <button
            key={s}
            onClick={() => setStatus(s)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
              status === s
                ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {filtered.map((item) => (
          <FeedCard key={`${item.kind}-${item.id}`} item={item} />
        ))}
      </div>
    </div>
  );
}
