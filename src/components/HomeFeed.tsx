"use client";

import { useEffect, useMemo, useState } from "react";
import type { Category, FeedItem } from "@/lib/types";
import FeedCard from "@/components/FeedCard";
import LoginButton from "@/components/LoginButton";
import OnboardingOverlay from "@/components/OnboardingOverlay";
import PageHeader from "@/components/PageHeader";
import Chip from "@/components/ui/Chip";
import EmptyState from "@/components/ui/EmptyState";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import { useProfile } from "@/lib/useProfile";
import { formatProfileSummary, REOPEN_ONBOARDING_KEY, type Profile } from "@/lib/profile";

const CATEGORIES: Category[] = ["주거", "일자리", "문화", "커뮤니티"];

function getSearchableText(item: FeedItem) {
  return item.kind === "policy"
    ? `${item.title} ${item.summary} ${item.description}`
    : `${item.name} ${item.summary} ${item.description}`;
}

export default function HomeFeed({ items }: { items: FeedItem[] }) {
  const { profile, update } = useProfile();
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "전체">("전체");

  useEffect(() => {
    if (!profile) return;

    const shouldReopen = window.localStorage.getItem(REOPEN_ONBOARDING_KEY) === "1";
    if (shouldReopen) {
      window.localStorage.removeItem(REOPEN_ONBOARDING_KEY);
      setShowOnboarding(true);
      return;
    }

    if (!profile.onboarded) setShowOnboarding(true);
  }, [profile]);

  const filtered = useMemo(() => {
    const q = query.trim();

    return items.filter((item) => {
      const matchesCategory = category === "전체" || item.category === category;
      if (!matchesCategory) return false;

      const matchesQuery = q === "" || getSearchableText(item).includes(q);
      if (!matchesQuery) return false;

      if (item.kind === "policy" && profile?.status) {
        return item.targetStatus.length === 0 || item.targetStatus.includes(profile.status);
      }
      return true;
    });
  }, [items, category, query, profile]);

  const hasProfileInfo =
    profile?.onboarded &&
    (profile.ageBracket !== null || profile.livesInJinju !== null || profile.status !== null);

  const isFiltering = query.trim() !== "" || category !== "전체";

  return (
    <div>
      {showOnboarding && profile && (
        <OnboardingOverlay
          initial={profile}
          onComplete={(next: Profile) => {
            update(next);
            setShowOnboarding(false);
          }}
          onSkip={() => {
            update({ ...profile, onboarded: true });
            setShowOnboarding(false);
          }}
        />
      )}

      <PageHeader
        title="잇다"
        description="진주 청년을 위한 정책과 커뮤니티 공간을 한 곳에서"
        action={
          <div className="flex flex-col items-end gap-2">
            <LoginButton />
            <SearchInput
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="청년, 월세 등 검색"
              aria-label="정책·공간 검색"
              className="w-36 sm:w-48"
            />
          </div>
        }
      />

      {hasProfileInfo && (
        <div className="mt-5 flex items-center justify-between gap-2 rounded-control bg-hamo-100 px-3.5 py-2.5 text-[13px] text-hamo-800">
          <span>{formatProfileSummary(profile!)} 기준으로 보는 중</span>
          <button
            type="button"
            onClick={() => setShowOnboarding(true)}
            className="shrink-0 rounded font-medium text-hamo-700 underline transition-colors hover:text-hamo-900"
          >
            조건 바꾸기
          </button>
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {(["전체", ...CATEGORIES] as const).map((c) => (
          <Chip key={c} active={category === c} onClick={() => setCategory(c)}>
            {c}
          </Chip>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState
          className="mt-5"
          message="이 조건에 맞는 게 아직 없어요"
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
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {filtered.map((item) => (
            <FeedCard key={`${item.kind}-${item.id}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
