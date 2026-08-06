const STORAGE_KEY = "itda.favorites";

type Listener = () => void;

let favorites: string[] = [];
let initialized = false;
const listeners = new Set<Listener>();

function readFromStorage(): string[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function ensureInitialized() {
  if (initialized || typeof window === "undefined") return;
  favorites = readFromStorage();
  initialized = true;
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): string[] {
  ensureInitialized();
  return favorites;
}

export function getServerSnapshot(): string[] {
  return favorites;
}

export function toggleFavorite(kind: "policy" | "space", id: number) {
  ensureInitialized();
  const key = `${kind}:${id}`;
  favorites = favorites.includes(key)
    ? favorites.filter((k) => k !== key)
    : [...favorites, key];

  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }
  emit();
}
