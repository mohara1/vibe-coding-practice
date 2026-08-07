/*
 * 입력 한 칸. 라벨과 오류 안내를 같은 규칙으로 붙인다.
 * 모서리는 10px (docs/requirements.md 4.6) — 이전에는 여기만 rounded-lg,
 * 검색창은 rounded-full 로 서로 달랐다.
 */

export const inputClass =
  "w-full rounded-control border border-slate-200 bg-white px-3.5 py-2.5 text-[15px] text-slate-700 transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-hamo-400";

export default function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-[13px] font-medium text-slate-500">{label}</span>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </label>
  );
}
