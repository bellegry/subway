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
  id: string;
  name: string;
  line: string;
  lat: number;
  lng: number;

  // "153", "P164", "A05" 등을 그대로 저장
  stationCode?: string;
}
