import rawStations from './stations.json';
import rawStationInfo from './stationInfo.json';

import type { RawStation, RawStationInfo, Station } from '@/types/station';

import { normalizeLine } from '@/utils/normalizeLine';

// 1. json의 route(노선명)를 API 표준 line명으로 바꾸는 매핑
// 1. 원본 데이터(stations.json의 route)를 표준 노선 이름으로 매핑
// 1. stations.json의 route(노선명)를 화면에 띄울 표준 이름으로 매핑
const ROUTE_TO_LINE_NAME: Record<string, string> = {
  '1호선': '1호선',
  경인선: '1호선',
  경부선: '1호선',
  경원선: '1호선',
  장항선: '1호선',
  '2호선': '2호선',
  신정지선: '2호선',
  성수지선: '2호선',
  '3호선': '3호선',
  일산선: '3호선',
  '4호선': '4호선',
  과천선: '4호선',
  안산선: '4호선',
  진접선: '4호선',
  '5호선': '5호선',
  '6호선': '6호선',
  '7호선': '7호선',
  '8호선': '8호선',
  '9호선': '9호선',
  경의선: '경의중앙선',
  중앙선: '경의중앙선',
  경춘선: '경춘선',
  분당선: '수인분당선',
  수인선: '수인분당선',
  신분당선: '신분당선',

  // 공항철도 및 인천선, 경전철 (stations.json 기준 이름들)
  공항철도1호선: '공항철도',
  공항철도: '공항철도',
  인천1호선: '인천1호선',
  인천2호선: '인천2호선',
  의정부경전철: '의정부경전철',
  용인경전철: '에버라인',
  에버라인: '에버라인',
  우이신설경전철: '우이신설선',
  우이신설선: '우이신설선',
  신림선: '신림선',
  김포골드라인: '김포골드라인',
  서해선: '서해선',
};

// 2. Map 생성시 고유 Key를 [역명_노선명] 구조로 생성하여 ID 중복 문제 원천 차단
const stationCodeMap = new Map<string, string>(); // fr_code 보관

(rawStationInfo.DATA as RawStationInfo[]).forEach((station) => {
  let lineName = station.line_num;

  // "01호선" -> "1호선" 정규화
  if (lineName.includes('호선') && !lineName.startsWith('인천')) {
    lineName = `${parseInt(lineName, 10)}호선`;
  }

  // ⭐️ [매핑 보정] stationInfo.json의 다른 이름들을 stations.json 기준으로 통일
  if (lineName === '공항철도') lineName = '공항철도'; // 이미 공항철도이므로 유지
  if (lineName === '인천선') lineName = '인천1호선'; // 👈 "인천선"을 "인천1호선"으로 보정!

  // 역명_노선명 조합으로 고유 Key 생성 (예: 송도달빛축제공원_인천1호선)
  const uniqueKey = `${station.station_nm}_${lineName}`;
  stationCodeMap.set(uniqueKey, station.fr_code);
});

// 역 정보 + 역 순서 병합
// 3. 최종 Station 배열 변환 (stations.json 돌면서 데이터 조립)
export const stations: Station[] = (rawStations.DATA as RawStation[]).map(
  (station) => {
    // stations.json에 적힌 route명을 표준 이름으로 변환 (예: "인천1호선" -> "인천1호선")
    const normalizedLineName =
      ROUTE_TO_LINE_NAME[station.route] || station.route;

    // 조립된 고유 Key로 외부 코드(fr_code) 매칭
    const uniqueKey = `${station.bldn_nm}_${normalizedLineName}`;
    let stationCode = stationCodeMap.get(uniqueKey) ?? '';

    // 서울역 하드코딩 방어 (1, 4, 공항, 경의중앙)
    if (station.bldn_nm.includes('서울')) {
      if (normalizedLineName === '1호선') stationCode = '133';
      if (normalizedLineName === '4호선') stationCode = '426';
      if (normalizedLineName === '공항철도') stationCode = 'A01';
      if (normalizedLineName === '경의중앙선') stationCode = 'K110';
    }

    return {
      id: `${station.bldn_id}_${normalizedLineName}`, // 환승역 ID 중복 방지
      name: station.bldn_nm,
      line: normalizedLineName,
      lat: Number(station.lat),
      lng: Number(station.lot),
      stationCode: stationCode,
    };
  },
);

// 4. 노선별 그룹화
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

// 5. fr_code 순 정렬
Object.values(stationsByLine).forEach((lineStations) => {
  lineStations.sort((a, b) => {
    const aOrder = Number(a.stationCode.replace(/^\D+/, '')) || 0;
    const bOrder = Number(b.stationCode.replace(/^\D+/, '')) || 0;
    return aOrder - bOrder;
  });
});
