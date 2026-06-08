import { create } from "zustand";

import { getArrival } from "@/lib/subway";
import { groupArrival } from "@/utils/goupArrival";

import type { RealtimeArrival } from "@/types/subway";

type GroupedArrival = ReturnType<typeof groupArrival>;

interface SubwayStore {
  station: string | null;
  arrivals: RealtimeArrival[];
  groupedArrivals: GroupedArrival;
  loading: boolean;
  error: string | null;
  fetchArrivals: (station: string) => Promise<void>;
}

export const useSubwayStore = create<SubwayStore>((set, get) => ({
  station: null,
  arrivals: [],
  groupedArrivals: {},
  loading: false,
  error: null,

  fetchArrivals: async (station: string) => {
    console.log("클릭됨:", station);
    if (!station) return;
    set({
      station,
      loading: true,
      error: null,
    });
    try {
      const arrivals = await getArrival(station);
      set({
        arrivals,
        groupedArrivals: groupArrival(arrivals),
      });
    } catch {
      set({
        error: "Failed to fetch arrival data.",
      });
    } finally {
      set({
        loading: false,
      });
    }
  },
}));
