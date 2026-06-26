import { RealtimeArrival } from "@/types/subway.types";
import { parseEta } from "./parseArrivalTime";

export function sortByEta(list: RealtimeArrival[]) {
  return [...list].sort((a, b) => parseEta(a.arvlMsg2) - parseEta(b.arvlMsg2));
}
