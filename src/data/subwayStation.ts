import rawData from "./stations.json";
import type { Station, RawStation } from "@/types/station";

export const stations: Station[] = (rawData.DATA as RawStation[]).map((station) => ({
  id: station.bldn_id,
  name: station.bldn_nm,
  line: station.route,
  lat: Number(station.lat),
  lng: Number(station.lot),
}));

export const stationsByLine = stations.reduce<Record<string, Station[]>>((acc, station) => {
  if (!acc[station.line]) {
    acc[station.line] = [];
  }

  acc[station.line].push(station);

  return acc;
}, {});

export const stationsByName = stations.reduce<Record<string, Station[]>>((acc, station) => {
  if (!acc[station.name]) {
    acc[station.name] = [];
  }

  acc[station.name].push(station);

  return acc;
}, {});
