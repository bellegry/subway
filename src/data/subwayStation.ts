import rawStations from './stations.json';
import rawStationInfo from './stationInfo.json';

import type { RawStation, RawStationInfo, Station } from '@/types/station';

import { normalizeLine } from '@/utils/normalizeLine';

// 역 정보 + 역 순서 매핑 생성
const stationInfoMap = new Map(
  (rawStationInfo.DATA as RawStationInfo[]).map((item) => [
    item.station_cd,
    item,
  ]),
);

// 역 정보 + 역 순서 병합
// 최종 Station 생성
// 역 순서 정보가 없는 경우는 99999로 처리해서 뒤로 보내도록 함
export const stations: Station[] = (rawStations.DATA as RawStation[]).map(
  (station) => {
    const info = stationInfoMap.get(station.bldn_id);

    return {
      id: station.bldn_id,
      name: station.bldn_nm,

      line: info ? normalizeLine(info.line_num) : '',

      lat: Number(station.lat),
      lng: Number(station.lot),

      stationCode: info?.fr_code,
    };
  },
);

// 노선별 그룹화 + 정렬
export const stationsByLine = stations.reduce<Record<string, Station[]>>(
  (acc, station) => {
    if (!acc[station.line]) {
      acc[station.line] = [];
    }

    acc[station.line].push(station);

    return acc;
  },
  {},
);
