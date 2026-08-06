"use client";

import { useState } from "react";
import type { AgeBracket, Status } from "@/lib/types";
import type { Profile } from "@/lib/profile";

const AGE_BRACKETS: AgeBracket[] = ["19-24", "25-29", "30-34"];
const STATUSES: Status[] = ["대학생", "직장인", "구직중"];

function chipClass(active: boolean) {
  return `rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
    active
      ? "bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900"
      : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300"
  }`;
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
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 sm:items-center">
      <div className="w-full max-w-sm rounded-t-2xl bg-white p-5 sm:rounded-2xl dark:bg-zinc-900">
        <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-50">3초면 충분해요</h2>
        <p className="mt-1 text-sm text-zinc-500">
          몇 가지만 알려주시면 딱 맞는 정책을 먼저 보여드려요
        </p>

        <div className="mt-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">나이대</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {AGE_BRACKETS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setAgeBracket(b)}
                className={chipClass(ageBracket === b)}
              >
                {b}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">진주에 살아요?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setLivesInJinju(true)}
              className={chipClass(livesInJinju === true)}
            >
              네
            </button>
            <button
              type="button"
              onClick={() => setLivesInJinju(false)}
              className={chipClass(livesInJinju === false)}
            >
              아니요
            </button>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">지금 뭐 해요?</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {STATUSES.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setStatus(s)}
                className={chipClass(status === s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onSkip}
            className="flex-1 rounded-full bg-zinc-100 py-2.5 text-sm font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            건너뛰기
          </button>
          <button
            type="button"
            onClick={() => onComplete({ onboarded: true, ageBracket, livesInJinju, status })}
            className="flex-1 rounded-full bg-zinc-900 py-2.5 text-sm font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
