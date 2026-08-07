"use client";

import Button from "@/components/ui/Button";
import { useMockAuth } from "@/lib/useMockAuth";

export default function LoginButton() {
  const { auth, login, logout } = useMockAuth();

  if (auth.loggedIn) {
    return (
      <Button variant="ghost" size="sm" onClick={logout}>
        {auth.nickname}님
      </Button>
    );
  }

  return (
    <Button size="sm" onClick={login}>
      로그인
    </Button>
  );
}
