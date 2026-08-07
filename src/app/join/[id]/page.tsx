"use client";

import { use } from "react";
import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";

export default function JoinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const { auth } = useMockAuth();
  const { posts, toggleParticipation, deletePost } = useParticipations();

  const post = posts.find((p) => p.id === Number(id));

  if (!post) {
    return (
      <PageShell>
        <PageHeader backHref="/join" backLabel="참여탭으로" title="글을 찾을 수 없어요" />
        <EmptyState
          className="mt-5"
          message="지워졌거나, 이 브라우저에 없는 글이에요. 모집 글은 기기마다 따로 저장돼요"
        />
      </PageShell>
    );
  }

  const isAuthor = auth.loggedIn && post.authorNickname === auth.nickname;
  const joined = auth.loggedIn && !!auth.nickname && post.participants.includes(auth.nickname);
  const full = post.participants.length >= post.capacity;

  const handleJoinClick = () => {
    if (!auth.loggedIn) {
      router.push("/my");
      return;
    }
    toggleParticipation(post.id);
  };

  const handleDeleteClick = () => {
    if (window.confirm("이 글을 삭제할까요? 삭제하면 되돌릴 수 없어요.")) {
      deletePost(post.id);
      router.push("/join");
    }
  };

  return (
    <PageShell>
      <PageHeader
        backHref="/join"
        backLabel="참여탭으로"
        title={post.title}
        description={post.authorNickname}
      />

      <p className="mt-5 whitespace-pre-wrap text-[15px] leading-relaxed text-slate-600">
        {post.content}
      </p>

      <p className="mt-5 text-[13px] text-slate-600">
        참여 인원{" "}
        <span className="font-mono font-semibold tabular-nums text-slate-700">
          {post.participants.length}/{post.capacity}
        </span>
      </p>

      <div className="mt-4">
        {joined ? (
          isAuthor ? (
            // 글쓴이는 자기 활동에서 빠질 수 없다
            <p className="text-sm text-slate-600">내가 연 활동이에요</p>
          ) : (
            <div className="space-y-2">
              <p className="text-sm text-slate-600">이미 참여한 활동이에요</p>
              <Button variant="secondary" onClick={handleJoinClick}>
                참여 취소하기
              </Button>
            </div>
          )
        ) : full ? (
          <span className="inline-flex h-11 items-center rounded-full bg-slate-100 px-5 text-[15px] font-medium text-slate-600">
            마감
          </span>
        ) : (
          <Button onClick={handleJoinClick}>참여하기</Button>
        )}
      </div>

      {isAuthor && (
        <div className="mt-8 border-t border-slate-200 pt-4">
          <Button variant="danger" size="sm" onClick={handleDeleteClick} className="-ml-4">
            삭제하기
          </Button>
        </div>
      )}
    </PageShell>
  );
}
