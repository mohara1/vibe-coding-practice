"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";

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
      <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
        <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
          <Link href="/join" className="text-sm text-zinc-500 hover:text-zinc-700">
            ← 참여탭으로
          </Link>
          <p className="mt-6 text-sm text-zinc-500">게시글을 찾을 수 없어요</p>
        </main>
      </div>
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
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <Link href="/join" className="text-sm text-zinc-500 hover:text-zinc-700">
          ← 참여탭으로
        </Link>

        <div className="mt-4">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">{post.title}</h1>
          <p className="mt-1 text-sm text-zinc-500">{post.authorNickname}</p>

          <p className="mt-4 whitespace-pre-wrap text-zinc-600 dark:text-zinc-400">
            {post.content}
          </p>

          <p className="mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            참여 인원 {post.participants.length}/{post.capacity}
          </p>

          {joined ? (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-zinc-500">이미 참여한 활동입니다</p>
              {!isAuthor && (
                <button
                  type="button"
                  onClick={handleJoinClick}
                  className="rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                >
                  참여 취소하기
                </button>
              )}
            </div>
          ) : full ? (
            <button
              type="button"
              disabled
              className="mt-4 rounded-full bg-zinc-200 px-5 py-2 text-sm font-medium text-zinc-500 dark:bg-zinc-800 dark:text-zinc-500"
            >
              마감
            </button>
          ) : (
            <button
              type="button"
              onClick={handleJoinClick}
              className="mt-4 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
            >
              참여하기
            </button>
          )}

          {isAuthor && (
            <div className="mt-8 rounded-lg border border-zinc-200 p-4 dark:border-zinc-800">
              <button
                type="button"
                onClick={handleDeleteClick}
                className="text-sm font-medium text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
              >
                삭제하기
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
