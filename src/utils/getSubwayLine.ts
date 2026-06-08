import SUBWAY_LINE from "@/data/subwayLine";

export const getSubwayLine = (subwayId: string): string => {
  return SUBWAY_LINE[subwayId] ?? subwayId;
};
