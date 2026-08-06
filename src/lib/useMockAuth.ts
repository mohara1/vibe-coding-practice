"use client";

import { useSyncExternalStore } from "react";
import {
  subscribe,
  getSnapshot,
  getServerSnapshot,
  login as loginStore,
  logout as logoutStore,
} from "@/lib/mockAuthStore";

export function useMockAuth() {
  const auth = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return { auth, login: loginStore, logout: logoutStore };
}
