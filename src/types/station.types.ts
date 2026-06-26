export interface RawStation {
  bldn_id: string;
  route: string;
  bldn_nm: string;
  lat: string;
  lot: string;
}

export interface RawStationInfo {
  line_num: string;
  station_cd: string;
  station_nm: string;
  station_nm_eng: string;
  station_nm_jpn: string;
  station_nm_chn: string;
  fr_code: string;
}

export interface Station {
  /** API 고유 역 ID (예: 1001000133) */
  statnId: string;

  /** API 노선 ID (예: 1001, 1002, 1007) */
  subwayId: string;

  /** API 호출 및 비교용 역명 (예: "서울") */
  name: string;

  /** 화면 표시용 역명 (예: "서울역") */
  displayName: string;

  /** 표시용 호선명 (예: "1호선") */
  line: string;
}
