"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";

export default function NewJoinPostPage() {
  const router = useRouter();
  const { auth } = useMockAuth();
  const { createPost } = useParticipations();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [capacity, setCapacity] = useState("2");

  useEffect(() => {
    if (!auth.loggedIn) {
      router.replace("/my");
    }
  }, [auth.loggedIn, router]);

  if (!auth.loggedIn) {
    return null;
  }

  const capacityNumber = Number(capacity);
  const isCapacityValid = Number.isInteger(capacityNumber) && capacityNumber >= 2;
  const canSubmit = title.trim().length > 0 && content.trim().length > 0 && isCapacityValid;

  const handleCancel = () => {
    if (window.confirm("작성 중인 내용이 사라져요. 정말 나가시겠어요?")) {
      router.push("/join");
    }
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    const post = createPost(title.trim(), content.trim(), capacityNumber);
    router.push(`/join/${post.id}`);
  };

  return (
    <div className="flex flex-1 justify-center bg-zinc-50 dark:bg-black">
      <main className="w-full max-w-3xl px-4 py-8 sm:px-8">
        <h1 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">모집 글쓰기</h1>

        <div className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">제목</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 주말에 같이 축구 하실분 모집합니다"
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">내용</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="나이, 장소, 시간대 등 원하는 조건을 적어주세요"
              rows={6}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
              총 참여 인원
            </label>
            <input
              type="number"
              min={2}
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
            {!isCapacityValid && (
              <p className="mt-1 text-xs text-red-500">2명 이상으로 설정해주세요</p>
            )}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={handleCancel}
            className="flex-1 rounded-full border border-zinc-300 px-5 py-2 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="flex-1 rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-zinc-50 dark:text-zinc-900"
          >
            게시하기
          </button>
        </div>
      </main>
    </div>
  );
}
