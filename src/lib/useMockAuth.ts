"use client";

import { useEffect, useState } from "react";
import { loadAuth, saveAuth, MOCK_NICKNAMES, type Auth } from "@/lib/mockAuth";

export function useMockAuth() {
  const [auth, setAuth] = useState<Auth | null>(null);

  useEffect(() => {
    setAuth(loadAuth());
  }, []);

  const login = () => {
    const current = loadAuth();
    const nickname =
      current.nickname ?? MOCK_NICKNAMES[Math.floor(Math.random() * MOCK_NICKNAMES.length)];
    const next: Auth = { loggedIn: true, nickname };
    saveAuth(next);
    setAuth(next);
  };

  const logout = () => {
    const next: Auth = { loggedIn: false, nickname: auth?.nickname ?? null };
    saveAuth(next);
    setAuth(next);
  };

  return { auth, login, logout };
}
