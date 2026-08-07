"use client";

import { getDaysRemaining } from "@/lib/dday";

// 숫자는 Mono 로 — 자리수가 바뀌어도 폭이 흔들리지 않는다 (4.5절).
const base =
  "rounded px-1.5 py-0.5 font-mono text-[12px] font-semibold tabular-nums";
const quiet = `${base} bg-slate-100 text-slate-600`;

export default function DdayBadge({ applyEnd }: { applyEnd: string | null }) {
  const days = getDaysRemaining(applyEnd);

  if (days === null) {
    return <span className={quiet}>상시</span>;
  }

  if (days < 0) {
    return <span className={quiet}>마감</span>;
  }

  // 7일 이하만 빨강. 그래야 빨강이 "급하다"는 뜻을 잃지 않는다.
  const isUrgent = days <= 7;

  // rose-600 인 이유: rose-500 위의 흰 글자는 대비가 3.67:1 이라 작은 글자에 못 쓴다
  return (
    <span className={isUrgent ? `${base} bg-rose-600 text-white` : quiet}>
      D-{days}
    </span>
  );
}
