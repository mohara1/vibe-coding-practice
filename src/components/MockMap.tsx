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

const GRID_BACKGROUND = {
  backgroundImage:
    "linear-gradient(rgba(0,0,0,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.06) 1px, transparent 1px)",
  backgroundSize: "12.5% 12.5%",
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
    <div
      style={GRID_BACKGROUND}
      className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-zinc-200 bg-zinc-100 dark:border-zinc-800 dark:bg-zinc-900"
    >
      <span className="absolute left-2 top-2 rounded bg-white/80 px-2 py-0.5 text-[11px] text-zinc-500 dark:bg-black/60 dark:text-zinc-400">
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
            className="group absolute -translate-x-1/2 -translate-y-1/2"
          >
            <span
              className={`block rounded-full ring-2 ring-white transition-transform dark:ring-zinc-900 ${dotColor[space.category]} ${
                isHighlighted ? "h-4 w-4 scale-125" : "h-3 w-3"
              }`}
            />
            <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded bg-zinc-900 px-1.5 py-0.5 text-[10px] text-white opacity-0 transition-opacity group-hover:opacity-100">
              {space.name}
            </span>
          </Link>
        );
      })}
    </div>
  );
}
