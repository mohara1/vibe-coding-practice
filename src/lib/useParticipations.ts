"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  createPost as createPostInStore,
  toggleParticipation as toggleParticipationInStore,
  deletePost as deletePostInStore,
} from "@/lib/participationsStore";

export function useParticipations() {
  const posts = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return {
    posts,
    createPost: createPostInStore,
    toggleParticipation: toggleParticipationInStore,
    deletePost: deletePostInStore,
  };
}
