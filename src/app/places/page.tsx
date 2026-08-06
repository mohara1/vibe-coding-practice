"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { spaces } from "@/data/spaces";
import type { Category } from "@/lib/types";
import CategoryBadge from "@/components/CategoryBadge";
import MockMap from "@/components/MockMap";
import SpacePhoto from "@/components/SpacePhoto";

const CATEGORIES: Category[] = ["주거", "일자리", "문화", "커뮤니티"];

export default function PlacesPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "전체">("전체");

  const filtered = useMemo(() => {
    const q = query.trim();
    return spaces.filter((space) => {
      const matchesCategory = category === "전체" || space.category === category;
      const matchesQuery = q === "" || space.name.includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [query, category]);

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">공간</h1>
        <p className="mt-1 text-sm text-zinc-500">
          진주 청년 관련 기관을 지도에서 찾아보세요
        </p>

        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="기관 이름으로 검색"
          className="mt-4 w-full rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm outline-none focus:border-zinc-400 dark:border-zinc-700 dark:bg-zinc-900"
        />

        <div className="mt-3 flex flex-wrap gap-2">
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

        <div className="mt-4">
          <MockMap spaces={filtered} />
        </div>

        <ul className="mt-4 space-y-2">
          {filtered.map((space) => (
            <li key={space.id}>
              <Link
                href={`/spaces/${space.id}`}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-white p-3 text-sm hover:shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="w-12 shrink-0">
                  <SpacePhoto
                    photoUrl={space.photoUrl}
                    category={space.category}
                    name={space.name}
                  />
                </div>
                <span className="flex flex-1 items-center gap-2">
                  <CategoryBadge category={space.category} />
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {space.name}
                  </span>
                </span>
                <span className="text-zinc-400">›</span>
              </Link>
            </li>
          ))}

          {filtered.length === 0 && (
            <li className="rounded-lg border border-dashed border-zinc-300 p-4 text-center text-sm text-zinc-500 dark:border-zinc-700">
              검색 결과가 없어요
            </li>
          )}
        </ul>
      </main>
    </div>
  );
}
