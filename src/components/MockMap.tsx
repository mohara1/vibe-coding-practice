import Link from "next/link";
import type { Space } from "@/lib/types";
import { spaces as allSpaces } from "@/data/spaces";
import { getMapBounds, toMapPosition } from "@/lib/mockMap";
import PearlDot from "@/components/PearlDot";

// 카테고리 지도 점 색 (docs/requirements.md 4.3)
const dotColor: Record<Space["category"], string> = {
  주거: "bg-housing",
  일자리: "bg-job",
  문화: "bg-culture",
  커뮤니티: "bg-community",
};

export default function MockMap({
  spaces,
  highlightId,
}: {
  spaces: Space[];
  highlightId?: number;
}) {
  // 필터링과 무관하게 항상 전체 공간 기준으로 지도 범위를 고정한다.
  const bounds = getMapBounds(allSpaces);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-card border border-slate-200 bg-hamo-50">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/jinju-map-bg.png"
        alt="진주 지역 지도"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <span className="absolute left-2.5 top-2.5 z-10 rounded-full bg-white/85 px-2.5 py-1 text-[11px] font-medium text-slate-600">
        진주시 (모의 지도)
      </span>

      {spaces.map((space) => {
        const { left, top } = toMapPosition(space, bounds);
        const isHighlighted = space.id === highlightId;

        return (
          <Link
            key={space.id}
            href={`/spaces/${space.id}`}
            title={space.name}
            style={{ left: `${left}%`, top: `${top}%` }}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 rounded-full"
          >
            {isHighlighted ? (
              // 강조된 공간은 진주 알로 (시그니처를 쓰는 세 곳 중 하나)
              <PearlDot className="h-5 w-5 text-hamo-500 drop-shadow-[0_1px_2px_rgb(23_50_95_/_0.35)]" />
            ) : (
              <span
                className={`block h-4 w-4 rounded-full shadow-card ring-2 ring-white ${dotColor[space.category]}`}
              />
            )}

            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full bg-hamo-900 px-2 py-0.5 text-[11px] font-medium text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">
              {space.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
