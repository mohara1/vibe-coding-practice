export type Auth = {
  loggedIn: boolean;
  nickname: string | null;
};

const STORAGE_KEY = "itda.auth";
const EMPTY_AUTH: Auth = { loggedIn: false, nickname: null };

export const MOCK_NICKNAMES = [
  "진주달빛청년",
  "가좌동몽돌청년",
  "남강러너",
  "성지청년",
  "진주성지킴이",
];

type Listener = () => void;

let auth: Auth = EMPTY_AUTH;
let initialized = false;
const listeners = new Set<Listener>();

function readFromStorage(): Auth {
  if (typeof window === "undefined") return EMPTY_AUTH;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY_AUTH, ...JSON.parse(raw) } : EMPTY_AUTH;
  } catch {
    return EMPTY_AUTH;
  }
}

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  auth = readFromStorage();
  initialized = true;
}

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): Auth {
  ensureInitialized();
  return auth;
}

export function getServerSnapshot(): Auth {
  return auth;
}

export function login() {
  ensureInitialized();
  const nickname =
    auth.nickname ?? MOCK_NICKNAMES[Math.floor(Math.random() * MOCK_NICKNAMES.length)];
  auth = { loggedIn: true, nickname };
  persist();
  emit();
}

export function logout() {
  ensureInitialized();
  auth = { loggedIn: false, nickname: auth.nickname };
  persist();
  emit();
}
