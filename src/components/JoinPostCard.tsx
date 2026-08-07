"use client";

import Link from "next/link";
import type { Participation } from "@/lib/types";
import Button from "@/components/ui/Button";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";

export default function JoinPostCard({ post }: { post: Participation }) {
  const { auth } = useMockAuth();
  const { deletePost } = useParticipations();
  const isAuthor = auth.loggedIn && post.authorNickname === auth.nickname;
  const full = post.participants.length >= post.capacity;

  const handleDelete = (e: React.MouseEvent) => {
    // 카드 전체가 링크라서 상세로 넘어가지 않게 막는다.
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("이 글을 삭제할까요? 삭제하면 되돌릴 수 없어요.")) {
      deletePost(post.id);
    }
  };

  return (
    <Link
      href={`/join/${post.id}`}
      className="relative block rounded-card border border-slate-200 bg-white p-4 shadow-card transition-shadow hover:shadow-card-hover"
    >
      {isAuthor && (
        <Button
          variant="danger"
          size="sm"
          onClick={handleDelete}
          aria-label="글 삭제하기"
          className="absolute right-2 top-2"
        >
          삭제
        </Button>
      )}

      <h2
        className={`text-base font-semibold text-hamo-900 ${isAuthor ? "pr-16" : ""}`}
      >
        {post.title}
      </h2>

      <p className="mt-2 text-[13px] text-slate-500">
        <span className="font-mono font-semibold tabular-nums text-slate-600">
          {post.participants.length}/{post.capacity}
        </span>
        명 {full ? "· 마감" : "참여 중"}
      </p>
    </Link>
  );
}
