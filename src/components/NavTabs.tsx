"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import PearlDot from "@/components/PearlDot";
import {
  FeedIcon,
  PlaceIcon,
  JoinIcon,
  MeIcon,
} from "@/components/icons";

const TABS = [
  { href: "/", label: "정보", Icon: FeedIcon },
  { href: "/places", label: "공간", Icon: PlaceIcon },
  { href: "/join", label: "참여", Icon: JoinIcon },
  { href: "/my", label: "마이", Icon: MeIcon },
] as const;

export default function NavTabs() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="주요 화면"
      // pb 는 아이폰 홈 인디케이터 영역. layout.tsx 의 body 하단 여백과 짝이다.
      className="fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)]"
    >
      <div className="mx-auto flex max-w-3xl">
        {TABS.map(({ href, label, Icon }) => {
          // 하위 경로(/join/new 등)에 있어도 그 탭이 켜져 있어야 한다.
          const active =
            href === "/" ? pathname === "/" : pathname.startsWith(href);

          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={`flex h-16 flex-1 flex-col items-center justify-center gap-1 text-[11px] font-medium transition-colors ${
                active
                  ? "text-hamo-600"
                  : "text-slate-400 hover:text-hamo-500"
              }`}
            >
              <Icon className="h-[22px] w-[22px]" />
              {label}
              {/* 활성 표시는 진주 한 알. 자리는 늘 잡아두어 글자가 밀리지 않게 한다. */}
              <PearlDot
                className={`h-1.5 w-1.5 ${active ? "text-hamo-500" : "text-transparent"}`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
