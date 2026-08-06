"use client";

import { useRouter } from "next/navigation";
import { useFavorites } from "@/lib/useFavorites";
import { useMockAuth } from "@/lib/useMockAuth";

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
      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base shadow transition-colors ${
        active
          ? "bg-red-500 text-white"
          : "bg-white/90 text-zinc-400 hover:text-red-400 dark:bg-zinc-900/90 dark:text-zinc-500"
      } ${className}`}
    >
      {active ? "♥" : "♡"}
    </button>
  );
}
