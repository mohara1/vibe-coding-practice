import Link from "next/link";
import type { Space } from "@/lib/types";
import { spaces as allSpaces } from "@/data/spaces";
import { getMapBounds, toMapPosition } from "@/lib/mockMap";

const dotColor: Record<Space["category"], string> = {
  주거: "bg-blue-500",
  일자리: "bg-emerald-500",
  문화: "bg-purple-500",
  커뮤니티: "bg-orange-500",
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
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/jinju-map-bg.png"
        alt="진주 지역 지도"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <span className="absolute left-2 top-2 z-10 rounded bg-white/80 px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-black/60 dark:text-zinc-400">
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
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className={`block rounded-full ring-2 ring-white shadow transition-transform dark:ring-zinc-900 ${dotColor[space.category]} ${
                isHighlighted ? "h-5 w-5 scale-125" : "h-4 w-4"
              }`}
            />
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-white opacity-0 shadow transition-opacity group-hover:opacity-100">
              {space.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
