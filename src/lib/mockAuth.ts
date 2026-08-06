export type Auth = {
  loggedIn: boolean;
  nickname: string | null;
};

const STORAGE_KEY = "itda.auth";

export const MOCK_NICKNAMES = [
  "진주달빛청년",
  "가좌동몽돌청년",
  "남강러너",
  "성지청년",
  "진주성지킴이",
];

export function loadAuth(): Auth {
  if (typeof window === "undefined") return { loggedIn: false, nickname: null };

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { loggedIn: false, nickname: null };
  } catch {
    return { loggedIn: false, nickname: null };
  }
}

export function saveAuth(auth: Auth) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
}
