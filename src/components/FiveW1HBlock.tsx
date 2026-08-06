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
    <dl className="mt-6 divide-y divide-zinc-200 rounded-xl border border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
      {ROWS.map(({ key, label }) => (
        <div key={key} className="flex gap-4 p-3 text-sm">
          <dt className="w-14 shrink-0 font-semibold text-zinc-500 dark:text-zinc-400">
            {label}
          </dt>
          <dd className="text-zinc-700 dark:text-zinc-300">{detail[key]}</dd>
        </div>
      ))}
    </dl>
  );
}
