"use client";

import { useEffect, useState } from "react";
import { loadProfile, saveProfile, type Profile } from "@/lib/profile";

export function useProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    setProfile(loadProfile());
  }, []);

  const update = (next: Profile) => {
    saveProfile(next);
    setProfile(next);
  };

  return { profile, update };
}
