"use client";

import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";
import JoinPostCard from "@/components/JoinPostCard";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

export default function JoinPage() {
  const router = useRouter();
  const { auth } = useMockAuth();
  const { posts } = useParticipations();

  // 로그인 안 했으면 마이탭(로그인 화면 역할)으로 보낸다.
  const handleWriteClick = () => {
    router.push(auth.loggedIn ? "/join/new" : "/my");
  };

  return (
    <PageShell>
      <PageHeader
        title="참여"
        description="같이 할 사람을 찾거나, 열려 있는 활동에 참여해보세요"
        action={
          <Button size="sm" onClick={handleWriteClick}>
            작성하기
          </Button>
        }
      />

      {posts.length === 0 ? (
        <EmptyState
          className="mt-6"
          message="아직 열린 활동이 없어요. 첫 글을 올려보세요"
          action={
            <Button size="sm" onClick={handleWriteClick}>
              글쓰기
            </Button>
          }
        />
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {posts.map((post) => (
            <JoinPostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </PageShell>
  );
}
