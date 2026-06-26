import SUBWAY_LINES from "@/data/subwayLines";

export const getSubwayLine = (subwayId: string): string => {
  return SUBWAY_LINES[subwayId] ?? subwayId;
};
