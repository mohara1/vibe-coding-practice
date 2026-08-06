"use client";

import { useMockAuth } from "@/lib/useMockAuth";

export default function LoginButton() {
  const { auth, login, logout } = useMockAuth();

  if (auth.loggedIn) {
    return (
      <button
        type="button"
        onClick={logout}
        className="whitespace-nowrap rounded-full bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
      >
        {auth.nickname}님
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={login}
      className="whitespace-nowrap rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white dark:bg-zinc-50 dark:text-zinc-900"
    >
      로그인
    </button>
  );
}
