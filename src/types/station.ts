export interface RawStation {
  bldn_id: string;
  route: string;
  bldn_nm: string;
  lat: string;
  lot: string;
}

export interface Station {
  id: string;
  name: string;
  line: string;
  lat: number;
  lng: number;
}
