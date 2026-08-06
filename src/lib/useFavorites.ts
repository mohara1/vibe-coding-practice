"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  toggleFavorite as toggleFavoriteInStore,
} from "@/lib/favoritesStore";

export function useFavorites() {
  const favorites = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isFavorite = (kind: "policy" | "space", id: number) =>
    favorites.includes(`${kind}:${id}`);

  const toggleFavorite = (kind: "policy" | "space", id: number) => {
    toggleFavoriteInStore(kind, id);
  };

  return { favorites, isFavorite, toggleFavorite };
}
