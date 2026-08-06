"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { policies } from "@/data/policies";
import { spaces } from "@/data/spaces";
import { useMockAuth } from "@/lib/useMockAuth";
import { useProfile } from "@/lib/useProfile";
import { useFavorites } from "@/lib/useFavorites";
import { formatProfileSummary, REOPEN_ONBOARDING_KEY } from "@/lib/profile";
import type { FeedItem } from "@/lib/types";
import FeedCard from "@/components/FeedCard";

export default function MyPage() {
  const router = useRouter();
  const { auth, login } = useMockAuth();
  const { profile } = useProfile();
  const { favorites } = useFavorites();

  const recommended = useMemo(() => {
    const status = profile?.status;
    const pool = status
      ? policies.filter((p) => p.targetStatus.length === 0 || p.targetStatus.includes(status))
      : policies;
    return pool.slice(0, 4);
  }, [profile]);

  const favoriteItems = useMemo(() => {
    return favorites
      .map((key): FeedItem | null => {
        const [kind, idStr] = key.split(":");
        const id = Number(idStr);
        if (kind === "policy") return policies.find((p) => p.id === id) ?? null;
        if (kind === "space") return spaces.find((s) => s.id === id) ?? null;
        return null;
      })
      .filter((item): item is FeedItem => item !== null);
  }, [favorites]);

  const reopenOnboarding = () => {
    window.localStorage.setItem(REOPEN_ONBOARDING_KEY, "1");
    router.push("/");
  };

  if (!auth) return null;

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">마이</h1>

        {!auth.loggedIn ? (
          <div className="mt-6 rounded-xl border border-dashed border-zinc-300 p-6 text-center text-sm text-zinc-500 dark:border-zinc-700">
            <p>로그인하면 내 정보와 찜한 목록을 볼 수 있어요</p>
            <button
              type="button"
              onClick={login}
              className="mt-3 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
            >
              로그인
            </button>
          </div>
        ) : (
          <>
            <p className="mt-1 text-sm text-zinc-500">{auth.nickname}님, 안녕하세요</p>

            <section className="mt-6">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">내 정보</h2>
              {profile?.onboarded ? (
                <div className="mt-2 flex items-center justify-between gap-2 rounded-lg bg-zinc-100 px-3 py-2 text-sm dark:bg-zinc-800">
                  <span className="text-zinc-700 dark:text-zinc-300">
                    {formatProfileSummary(profile)}
                  </span>
                  <button
                    type="button"
                    onClick={reopenOnboarding}
                    className="shrink-0 text-xs font-medium text-zinc-900 underline dark:text-zinc-50"
                  >
                    조건 바꾸기
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-sm text-zinc-500">아직 설정한 정보가 없어요</p>
              )}
            </section>

            <section className="mt-6">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                추천 정책
              </h2>
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {recommended.map((item) => (
                  <FeedCard key={`${item.kind}-${item.id}`} item={item} />
                ))}
              </div>
            </section>

            <section className="mt-6">
              <h2 className="text-sm font-semibold text-zinc-900 dark:text-zinc-50">
                찜한 목록
              </h2>
              {favoriteItems.length === 0 ? (
                <p className="mt-2 text-sm text-zinc-500">아직 찜한 게 없어요</p>
              ) : (
                <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {favoriteItems.map((item) => (
                    <FeedCard key={`${item.kind}-${item.id}`} item={item} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}
