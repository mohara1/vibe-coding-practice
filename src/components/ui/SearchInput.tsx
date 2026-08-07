import { SearchIcon } from "@/components/icons";

/*
 * 검색창. 정보탭과 공간탭에서 같은 모양을 쓴다.
 *
 * 모서리는 알약이 아니라 10px 이다 (docs/requirements.md 4.6).
 * 알약은 "누르는 것"에만 쓰기로 정했고, 검색창은 "쓰는 곳"이다.
 * outline-none 을 넣지 않는다 — 전역 :focus-visible 표시를 살려둔다.
 */
export default function SearchInput({
  className = "",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="text"
        className="h-10 w-full rounded-control border border-slate-200 bg-white pl-9 pr-3 text-sm text-slate-700 transition-colors placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-hamo-400"
        {...props}
      />
    </div>
  );
}
