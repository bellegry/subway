import stationMeta from "./stations.json";

import type { Station } from "@/types/station.types";

// 최종 Station 생성
export const stations: Station[] = stationMeta.map((item) => ({
  statnId: item.statnId,
  subwayId: item.subwayId,
  name: item.statnNm,
  displayName: item.statnNm,
  line: item.line,
}));

// 노선별 그룹화
export const stationsByLine = stations.reduce<Record<string, Station[]>>(
  (acc, station) => {
    if (!acc[station.subwayId]) {
      acc[station.subwayId] = [];
    }

    acc[station.subwayId].push(station);

    return acc;
  },
  {},
);
