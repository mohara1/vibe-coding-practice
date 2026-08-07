import PearlDot from "@/components/PearlDot";

/*
 * 섹션 제목. 앞에 진주 알이 붙는다 — 시그니처를 쓰는 세 곳 중 하나
 * (docs/requirements.md 4.8).
 *
 * 이전에는 섹션 제목이 본문과 같은 크기(text-sm)여서 위계가 없었다.
 */
export default function SectionHeading({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`flex items-center gap-2 text-[15px] font-semibold text-slate-800 ${className}`}
    >
      <PearlDot className="h-1.5 w-1.5 shrink-0 text-hamo-300" />
      {children}
    </h2>
  );
}
