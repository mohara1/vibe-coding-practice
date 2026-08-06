import type { AgeBracket, Status } from "@/lib/types";

export type Profile = {
  onboarded: boolean;
  ageBracket: AgeBracket | null;
  livesInJinju: boolean | null;
  status: Status | null;
};

export const EMPTY_PROFILE: Profile = {
  onboarded: false,
  ageBracket: null,
  livesInJinju: null,
  status: null,
};

const STORAGE_KEY = "itda.profile";
export const REOPEN_ONBOARDING_KEY = "itda.reopenOnboarding";

export function loadProfile(): Profile {
  if (typeof window === "undefined") return EMPTY_PROFILE;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? { ...EMPTY_PROFILE, ...JSON.parse(raw) } : EMPTY_PROFILE;
  } catch {
    return EMPTY_PROFILE;
  }
}

export function saveProfile(profile: Profile) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
}

export function formatProfileSummary(profile: Profile) {
  const parts: string[] = [];
  if (profile.ageBracket) parts.push(`${profile.ageBracket}세`);
  if (profile.livesInJinju === true) parts.push("진주 거주");
  if (profile.livesInJinju === false) parts.push("진주 외 거주");
  if (profile.status) parts.push(profile.status);
  return parts.length > 0 ? parts.join(" · ") : "전체";
}
