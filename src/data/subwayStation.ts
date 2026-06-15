import rawStations from './stations.json';
import rawStationInfo from './stationInfo.json';

import type { RawStation, RawStationInfo, Station } from '@/types/station';

import { normalizeLine } from '@/utils/normalizeLine';

// 역 정보 + 역 순서 매핑 생성
const stationCodeMap = new Map<string, string>();

(rawStationInfo.DATA as RawStationInfo[]).forEach((station) => {
  stationCodeMap.set(station.station_cd, station.fr_code);
});

// 역 정보 + 역 순서 병합
// 최종 Station 생성
export const stations: Station[] = (rawStations.DATA as RawStation[]).map(
  (station) => ({
    id: station.bldn_id,
    name: station.bldn_nm,
    line: station.route,
    lat: Number(station.lat),
    lng: Number(station.lot),
    stationCode: stationCodeMap.get(station.bldn_id) ?? '',
  }),
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

// frCode에서 숫자만 추출하여 정렬 기준으로 사용
Object.values(stationsByLine).forEach((stations) => {
  stations.sort((a, b) => {
    const aOrder = Number(a.stationCode.replace(/^\D+/, ''));
    const bOrder = Number(b.stationCode.replace(/^\D+/, ''));

    return aOrder - bOrder;
  });
});
