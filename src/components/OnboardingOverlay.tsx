"use client";

import { useState } from "react";
import type { AgeBracket, Status } from "@/lib/types";
import type { Profile } from "@/lib/profile";
import Button from "@/components/ui/Button";
import Chip from "@/components/ui/Chip";

const AGE_BRACKETS: AgeBracket[] = ["19-24", "25-29", "30-34"];
const STATUSES: Status[] = ["대학생", "직장인", "구직중"];

function Question({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5">
      <p className="text-[13px] font-medium text-slate-500">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">{children}</div>
    </div>
  );
}

export default function OnboardingOverlay({
  initial,
  onComplete,
  onSkip,
}: {
  initial: Profile;
  onComplete: (profile: Profile) => void;
  onSkip: () => void;
}) {
  const [ageBracket, setAgeBracket] = useState<AgeBracket | null>(initial.ageBracket);
  const [livesInJinju, setLivesInJinju] = useState<boolean | null>(initial.livesInJinju);
  const [status, setStatus] = useState<Status | null>(initial.status);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-hamo-900/45 sm:items-center">
      {/* 모바일에서는 아래에서 올라오는 시트, 데스크톱에서는 가운데 창 */}
      <div className="w-full max-w-sm rounded-t-card bg-white p-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:rounded-card sm:pb-5">
        <h2 className="text-xl font-bold text-hamo-900">3초면 충분해요</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-slate-500">
          몇 가지만 알려주시면 딱 맞는 정책을 먼저 보여드려요
        </p>

        <Question label="나이대">
          {AGE_BRACKETS.map((b) => (
            <Chip key={b} active={ageBracket === b} onClick={() => setAgeBracket(b)}>
              {b}
            </Chip>
          ))}
        </Question>

        <Question label="진주에 살아요?">
          <Chip active={livesInJinju === true} onClick={() => setLivesInJinju(true)}>
            네
          </Chip>
          <Chip active={livesInJinju === false} onClick={() => setLivesInJinju(false)}>
            아니요
          </Chip>
        </Question>

        <Question label="지금 뭐 해요?">
          {STATUSES.map((s) => (
            <Chip key={s} active={status === s} onClick={() => setStatus(s)}>
              {s}
            </Chip>
          ))}
        </Question>

        <div className="mt-7 flex gap-2">
          <Button variant="ghost" onClick={onSkip} className="flex-1">
            건너뛰기
          </Button>
          <Button
            onClick={() => onComplete({ onboarded: true, ageBracket, livesInJinju, status })}
            className="flex-1"
          >
            완료
          </Button>
        </div>
      </div>
    </div>
  );
}
