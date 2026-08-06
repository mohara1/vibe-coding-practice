"use client";

import { getDaysRemaining } from "@/lib/dday";

export default function DdayBadge({ applyEnd }: { applyEnd: string | null }) {
  const days = getDaysRemaining(applyEnd);

  if (days === null) {
    return (
      <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
        상시
      </span>
    );
  }

  if (days < 0) {
    return (
      <span className="rounded bg-zinc-200 px-1.5 py-0.5 text-[11px] font-medium text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300">
        마감
      </span>
    );
  }

  const isUrgent = days <= 7;

  return (
    <span
      className={`rounded px-1.5 py-0.5 text-[11px] font-medium ${
        isUrgent
          ? "bg-red-500 text-white"
          : "bg-zinc-200 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
      }`}
    >
      D-{days}
    </span>
  );
}
