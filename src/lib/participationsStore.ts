import { getSnapshot as getAuthSnapshot } from "./mockAuthStore";
import type { Participation } from "./types";

const STORAGE_KEY = "itda.participations";

type Listener = () => void;

let posts: Participation[] = [];
let nextId = 1;
let initialized = false;
const listeners = new Set<Listener>();

function readFromStorage(): Participation[] {
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
  posts = readFromStorage();
  nextId = posts.reduce((max, post) => Math.max(max, post.id), 0) + 1;
  initialized = true;
}

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
  }
}

function emit() {
  listeners.forEach((listener) => listener());
}

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function getSnapshot(): Participation[] {
  ensureInitialized();
  return posts;
}

export function getServerSnapshot(): Participation[] {
  return posts;
}

export function createPost(title: string, content: string, capacity: number): Participation {
  ensureInitialized();
  const nickname = getAuthSnapshot().nickname ?? "익명";

  const post: Participation = {
    id: nextId++,
    title,
    authorNickname: nickname,
    content,
    capacity,
    participants: [nickname],
    createdAt: new Date().toISOString(),
  };

  posts = [post, ...posts];
  persist();
  emit();
  return post;
}

export function deletePost(id: number) {
  ensureInitialized();
  const auth = getAuthSnapshot();
  if (!auth.loggedIn || !auth.nickname) return;

  const post = posts.find((p) => p.id === id);
  if (!post || post.authorNickname !== auth.nickname) return;

  posts = posts.filter((p) => p.id !== id);
  persist();
  emit();
}

export function toggleParticipation(id: number) {
  ensureInitialized();
  const auth = getAuthSnapshot();
  if (!auth.loggedIn || !auth.nickname) return;
  const nickname = auth.nickname;

  posts = posts.map((post) => {
    if (post.id !== id) return post;
    if (nickname === post.authorNickname) return post;

    if (post.participants.includes(nickname)) {
      return { ...post, participants: post.participants.filter((n) => n !== nickname) };
    }
    if (post.participants.length >= post.capacity) return post;
    return { ...post, participants: [...post.participants, nickname] };
  });

  persist();
  emit();
}
