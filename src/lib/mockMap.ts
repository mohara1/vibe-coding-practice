import type { Space } from "@/lib/types";

const PADDING_DEGREES = 0.004;

export type MapBounds = {
  minLat: number;
  maxLat: number;
  minLng: number;
  maxLng: number;
};

export function getMapBounds(allSpaces: Space[]): MapBounds {
  const lats = allSpaces.map((s) => s.lat);
  const lngs = allSpaces.map((s) => s.lng);

  return {
    minLat: Math.min(...lats) - PADDING_DEGREES,
    maxLat: Math.max(...lats) + PADDING_DEGREES,
    minLng: Math.min(...lngs) - PADDING_DEGREES,
    maxLng: Math.max(...lngs) + PADDING_DEGREES,
  };
}

export function toMapPosition(space: Space, bounds: MapBounds) {
  const left = ((space.lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * 100;
  const top = ((bounds.maxLat - space.lat) / (bounds.maxLat - bounds.minLat)) * 100;
  return { left, top };
}
