"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useMockAuth } from "@/lib/useMockAuth";
import { useParticipations } from "@/lib/useParticipations";
import PageShell from "@/components/PageShell";
import PageHeader from "@/components/PageHeader";
import Button from "@/components/ui/Button";
import Field, { inputClass } from "@/components/ui/Field";

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
    <PageShell>
      <PageHeader
        title="모집 글쓰기"
        description="글을 올리면 나도 참여자로 함께 들어가요"
      />

      <div className="mt-6 space-y-4">
        <Field label="제목">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="예: 주말에 같이 축구 하실 분"
            className={inputClass}
          />
        </Field>

        <Field label="내용">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="나이, 장소, 시간대 등 원하는 조건을 적어주세요"
            rows={6}
            className={`${inputClass} resize-y`}
          />
        </Field>

        <Field
          label="총 참여 인원"
          error={!isCapacityValid ? "2명 이상으로 설정해주세요" : undefined}
        >
          <input
            type="number"
            min={2}
            value={capacity}
            onChange={(e) => setCapacity(e.target.value)}
            className={`${inputClass} font-mono tabular-nums`}
          />
        </Field>
      </div>

      <div className="mt-6 flex gap-2">
        <Button variant="secondary" onClick={handleCancel} className="flex-1">
          취소
        </Button>
        <Button onClick={handleSubmit} disabled={!canSubmit} className="flex-1">
          게시하기
        </Button>
      </div>
    </PageShell>
  );
}
