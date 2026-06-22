import { create } from 'zustand';
import { getArrival } from '@/lib/subway';
import type { RealtimeArrival } from '@/types/subway';
import type { Station } from '@/types/station';

interface SubwayStore {
  selectedStation: Station | null;

  // 호선 선택 ex) "1001"
  selectedLine: string;
  // 상행 | 하행
  selectedDirection: string;
  // 행선지별에서 선택된 행선지
  selectedDestination: string | null;
  // 보기 모드
  viewMode: 'top3' | 'destination';

  // 도착 정보
  arrivals: RealtimeArrival[];

  setStation: (station: Station) => void;
  setLine: (line: string) => void;
  setDirection: (dir: string) => void;
  setDestination: (dest: string | null) => void;
  setViewMode: (mode: 'top3' | 'destination') => void;

  fetchArrivals: (station: Station) => Promise<void>;
}

export const useSubwayStore = create<SubwayStore>((set) => ({
  selectedStation: null,
  selectedLine: '',
  selectedDirection: '',
  selectedDestination: null,
  viewMode: 'top3',
  arrivals: [],

  setLine: (line) =>
    set({
      selectedLine: line,
      selectedDirection: '',
      selectedDestination: null,
    }),
  setDirection: (dir) =>
    set({
      selectedDirection: dir,
      selectedDestination: null,
    }),
  setDestination: (dest) =>
    set({
      selectedDestination: dest,
    }),
  setViewMode: (mode) =>
    set({
      viewMode: mode,
    }),

  setStation: (station) =>
    set({
      selectedStation: station,
    }),

  fetchArrivals: async (station: Station) => {
    const arrivals = await getArrival(station.name);

    console.log('봉 확인용');
    console.table(
      arrivals?.map((item) => ({
        subwayId: item.subwayId,
        statnNm: item.statnNm,
        statnId: item.statnId,
        trainLineNm: item.trainLineNm,
        updnLine: item.updnLine,
      })),
    );

    if (!arrivals?.length) {
      set({
        arrivals: [],
        selectedLine: '',
        selectedDirection: '',
        selectedDestination: null,
      });
      return;
    }

    const firstLine = arrivals[0].subwayId;

    const firstDirection =
      arrivals.find((item) => item.subwayId === firstLine)?.updnLine ?? '';

    set({
      selectedStation: station,
      arrivals,
      selectedLine: firstLine,
      selectedDirection: firstDirection,
      selectedDestination: null,
    });
  },
}));
