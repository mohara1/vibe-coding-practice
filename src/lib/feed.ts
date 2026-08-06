import { policies } from "@/data/policies";
import { spaces } from "@/data/spaces";
import type { FeedItem } from "@/lib/types";

export function getFeed(): FeedItem[] {
  const feed: FeedItem[] = [];
  const max = Math.max(policies.length, spaces.length);

  for (let i = 0; i < max; i++) {
    if (policies[i]) feed.push(policies[i]);
    if (spaces[i]) feed.push(spaces[i]);
  }

  return feed;
}

export function getPolicyById(id: number) {
  return policies.find((p) => p.id === id);
}

export function getSpaceById(id: number) {
  return spaces.find((s) => s.id === id);
}
