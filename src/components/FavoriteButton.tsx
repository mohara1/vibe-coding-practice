"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "@/lib/useFavorites";
import { useMockAuth } from "@/lib/useMockAuth";
import { HeartIcon } from "@/components/icons";

export default function FavoriteButton({
  kind,
  id,
  className = "",
}: {
  kind: "policy" | "space";
  id: number;
  className?: string;
}) {
  const router = useRouter();
  const { auth } = useMockAuth();
  const { isFavorite, toggleFavorite } = useFavorites();
  const active = isFavorite(kind, id);

  return (
    <button
      type="button"
      onClick={(e) => {
        // 카드 전체가 링크라서, 하트를 눌렀을 때 상세로 넘어가지 않게 막는다.
        e.preventDefault();
        e.stopPropagation();

        if (!auth.loggedIn) {
          router.push("/my");
          return;
        }
        toggleFavorite(kind, id);
      }}
      aria-label={active ? "찜 해제" : "찜하기"}
      aria-pressed={active}
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full shadow-card transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hamo-600 ${
        active
          ? "bg-rose-500 text-white"
          : "bg-white/90 text-slate-500 hover:text-rose-500"
      } ${className}`}
    >
      <HeartIcon className="h-[17px] w-[17px]" filled={active} />
    </button>
  );
}
