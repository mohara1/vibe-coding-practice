"use client";

import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";
import JoinPostCard from "@/components/JoinPostCard";

export default function JoinPage() {
  const router = useRouter();
  const { auth } = useMockAuth();
  const { posts } = useParticipations();

  const handleWriteClick = () => {
    router.push(auth.loggedIn ? "/join/new" : "/my");
  };

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">참여</h1>
          <button
            type="button"
            onClick={handleWriteClick}
            className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
          >
            작성하기
          </button>
        </div>

        {posts.length === 0 ? (
          <p className="mt-8 text-sm text-zinc-500">아직 등록된 활동이 없어요</p>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {posts.map((post) => (
              <JoinPostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
