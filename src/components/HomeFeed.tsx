"use client";

import { useMemo, useState } from "react";
import type { Category, FeedItem, Status } from "@/lib/types";
import FeedCard from "@/components/FeedCard";

const CATEGORIES: Category[] = ["주거", "일자리", "문화", "커뮤니티"];
const STATUSES: Status[] = ["대학생", "직장인"];

function getSearchableText(item: FeedItem) {
  return item.kind === "policy"
    ? `${item.title} ${item.summary} ${item.description}`
    : `${item.name} ${item.summary} ${item.description}`;
}

export default function HomeFeed({ items }: { items: FeedItem[] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "전체">("전체");
  const [status, setStatus] = useState<Status | "전체">("전체");

  const filtered = useMemo(() => {
    const q = query.trim();

    return items.filter((item) => {
      const matchesCategory = category === "전체" || item.category === category;
      if (!matchesCategory) return false;

      const matchesQuery = q === "" || getSearchableText(item).includes(q);
      if (!matchesQuery) return false;

      if (item.kind === "policy" && status !== "전체") {
        return item.targetStatus.length === 0 || item.targetStatus.includes(status);
      }
      return true;
    });
  }, [items, category, status, query]);

  return (
    <div>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">잇다</h1>
          <p className="mt-1 text-sm text-zinc-500">
            진주 청년을 위한 정책과 커뮤니티 공간을 한 곳에서
          </p>
        </div>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="청년, 월세 등 검색"
          className="w-32 shrink-0 rounded-full border border-zinc-200 bg-white px-3.5 py-1.5 text-sm outline-none focus:border-zinc-400 sm:w-44 dark:border-zinc-700 dark:bg-zinc-900"
        />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
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

      {filtered.length === 0 && (
        <div className="mt-4 rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500 dark:border-zinc-700">
          검색 결과가 없어요
        </div>
      )}
    </div>
  );
}
