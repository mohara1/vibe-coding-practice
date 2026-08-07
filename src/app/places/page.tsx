"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { spaces } from "@/data/spaces";
import type { Category } from "@/lib/types";
import CategoryBadge from "@/components/CategoryBadge";
import MockMap from "@/components/MockMap";
import CardPhoto from "@/components/CardPhoto";
import FavoriteButton from "@/components/FavoriteButton";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Chip from "@/components/ui/Chip";
import EmptyState from "@/components/ui/EmptyState";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import { ChevronRightIcon } from "@/components/icons";

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

  const isFiltering = query.trim() !== "" || category !== "전체";

  return (
    <PageShell>
      <PageHeader
        title="공간"
        description="진주 청년 관련 기관을 지도에서 찾아보세요"
      />

      <SearchInput
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="기관 이름으로 검색"
        aria-label="기관 이름으로 검색"
        className="mt-5"
      />

      <div className="mt-3 flex flex-wrap gap-2">
        {(["전체", ...CATEGORIES] as const).map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>

      <div className="mt-4">
        <MockMap spaces={filtered} />
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-4"
          message="이 조건에 맞는 공간이 없어요"
          action={
            isFiltering ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setQuery("");
                  setCategory("전체");
                }}
              >
                조건 지우기
              </Button>
            ) : undefined
          }
        />
      ) : (
        <ul className="mt-4 space-y-2">
          {filtered.map((space) => (
            <li key={space.id}>
              <Link
                href={`/spaces/${space.id}`}
                className="flex items-center gap-3 rounded-control border border-slate-200 bg-white p-3 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <div className="w-12 shrink-0">
                  <CardPhoto
                    photoUrl={space.photoUrl}
                    category={space.category}
                    name={space.name}
                  />
                </div>
                <span className="flex min-w-0 flex-1 items-center gap-2">
                  <CategoryBadge category={space.category} />
                  <span className="truncate font-medium text-hamo-900">
                    {space.name}
                  </span>
                </span>
                <FavoriteButton kind="space" id={space.id} />
                <ChevronRightIcon className="h-4 w-4 shrink-0 text-slate-300" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
