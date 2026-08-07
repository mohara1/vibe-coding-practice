"use client";

import Link from "next/link";
import type { Participation } from "@/lib/types";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";

export default function JoinPostCard({ post }: { post: Participation }) {
  const { auth } = useMockAuth();
  const { deletePost } = useParticipations();
  const isAuthor = auth.loggedIn && post.authorNickname === auth.nickname;

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("이 글을 삭제할까요? 삭제하면 되돌릴 수 없어요.")) {
      deletePost(post.id);
    }
  };

  return (
    <Link
      href={`/join/${post.id}`}
      className="relative block rounded-xl border border-zinc-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
    >
      {isAuthor && (
        <button
          type="button"
          onClick={handleDelete}
          aria-label="글 삭제하기"
          className="absolute right-3 top-3 rounded-md border border-zinc-300 px-2 py-1 text-xs font-medium text-zinc-500 transition-colors hover:border-red-300 hover:text-red-500 dark:border-zinc-700 dark:text-zinc-400 dark:hover:border-red-400 dark:hover:text-red-400"
        >
          삭제
        </button>
      )}

      <h2 className="pr-14 text-base font-semibold text-zinc-900 dark:text-zinc-50">
        {post.title}
      </h2>
      <p className="mt-2 text-sm text-zinc-500">
        {post.participants.length}/{post.capacity}
      </p>
    </Link>
  );
}
