"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { policies } from "@/data/policies";
import { spaces } from "@/data/spaces";
import { useMockAuth } from "@/lib/useMockAuth";
import { useProfile } from "@/lib/useProfile";
import { useFavorites } from "@/lib/useFavorites";
import { useParticipations } from "@/lib/useParticipations";
import { formatProfileSummary, REOPEN_ONBOARDING_KEY } from "@/lib/profile";
import type { FeedItem } from "@/lib/types";
import FeedCard from "@/components/FeedCard";
import JoinPostCard from "@/components/JoinPostCard";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import SectionHeading from "@/components/ui/SectionHeading";

export default function MyPage() {
  const router = useRouter();
  const { auth, login } = useMockAuth();
  const { profile } = useProfile();
  const { favorites } = useFavorites();
  const { posts } = useParticipations();

  const myPosts = useMemo(
    () => posts.filter((post) => post.authorNickname === auth.nickname),
    [posts, auth.nickname]
  );

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

  // 온보딩은 정보탭에만 있으므로, 플래그를 남기고 그쪽으로 보낸다.
  const reopenOnboarding = () => {
    window.localStorage.setItem(REOPEN_ONBOARDING_KEY, "1");
    router.push("/");
  };

  if (!auth.loggedIn) {
    return (
      <PageShell>
        <PageHeader title="마이" />
        <EmptyState
          className="mt-6"
          message="로그인하면 내 정보와 찜한 목록을 볼 수 있어요"
          action={<Button onClick={login}>로그인</Button>}
        />
      </PageShell>
    );
  }

  return (
    <PageShell>
      <PageHeader title="마이" description={`${auth.nickname}님, 안녕하세요`} />

      <section className="mt-7">
        <SectionHeading>내 정보</SectionHeading>
        {profile?.onboarded ? (
          <div className="mt-2.5 flex items-center justify-between gap-2 rounded-control bg-hamo-100 px-3.5 py-2.5 text-sm text-hamo-800">
            <span>{formatProfileSummary(profile)}</span>
            <button
              type="button"
              onClick={reopenOnboarding}
              className="shrink-0 rounded text-[13px] font-medium text-hamo-700 underline transition-colors hover:text-hamo-900"
            >
              조건 바꾸기
            </button>
          </div>
        ) : (
          <EmptyState
            className="mt-2.5"
            message="아직 설정한 정보가 없어요"
            action={
              <Button variant="secondary" size="sm" onClick={reopenOnboarding}>
                조건 설정하기
              </Button>
            }
          />
        )}
      </section>

      <section className="mt-7">
        <SectionHeading>추천 정책</SectionHeading>
        <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {recommended.map((item) => (
            <FeedCard key={`${item.kind}-${item.id}`} item={item} />
          ))}
        </div>
      </section>

      <section className="mt-7">
        <SectionHeading>찜한 목록</SectionHeading>
        {favoriteItems.length === 0 ? (
          <EmptyState className="mt-2.5" message="아직 찜한 게 없어요" />
        ) : (
          <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {favoriteItems.map((item) => (
              <FeedCard key={`${item.kind}-${item.id}`} item={item} />
            ))}
          </div>
        )}
      </section>

      <section className="mt-7">
        <SectionHeading>내가 쓴 글</SectionHeading>
        {myPosts.length === 0 ? (
          <EmptyState
            className="mt-2.5"
            message="아직 작성한 모집 글이 없어요"
            action={
              <Button variant="secondary" size="sm" onClick={() => router.push("/join/new")}>
                작성하기
              </Button>
            }
          />
        ) : (
          <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {myPosts.map((post) => (
              <JoinPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </section>
    </PageShell>
  );
}
