import type { FiveW1H } from "@/lib/types";

const ROWS: { key: keyof FiveW1H; label: string }[] = [
  { key: "who", label: "누가" },
  { key: "when", label: "언제" },
  { key: "where", label: "어디서" },
  { key: "what", label: "무엇을" },
  { key: "how", label: "어떻게" },
  { key: "why", label: "왜" },
];

export default function FiveW1HBlock({ detail }: { detail: FiveW1H }) {
  return (
    <dl className="mt-4 divide-y divide-slate-100 overflow-hidden rounded-card border border-slate-200 bg-white">
      {ROWS.map(({ key, label }) => (
        <div key={key} className="flex gap-4 px-4 py-3">
          {/* 라벨은 값보다 약하게. 이전에는 font-semibold 라 라벨이 더 세게 보였다. */}
          <dt className="w-14 shrink-0 pt-px text-[13px] font-medium text-slate-500">
            {label}
          </dt>
          <dd className="text-[15px] leading-relaxed text-slate-700">
            {detail[key]}
          </dd>
        </div>
      ))}
    </dl>
  );
}
