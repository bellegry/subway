import { create } from 'zustand';
import { getArrival } from '@/lib/subway';
import type { RealtimeArrival } from '@/types/subway';

interface SubwayStore {
  // 호선 선택 ex) "1001"
  selectedLine: string;

  // 보기 모드
  viewMode: 'top3' | 'destination';

  // 행선지별에서 선택된 행선지
  selectedDestination: string | null;

  // 상행 | 하행
  selectedDirection: string;

  // 도착 정보
  arrivals: RealtimeArrival[];

  setLine: (line: string) => void;
  setDirection: (dir: string) => void;
  setDestination: (dest: string) => void;
  setViewMode: (mode: 'top3' | 'destination') => void;

  fetchArrivals: (station: string) => Promise<void>;
}

export const useSubwayStore = create<SubwayStore>((set) => ({
  selectedLine: '1',
  selectedDirection: '상행',
  selectedDestination: null,
  viewMode: 'top3',

  arrivals: [],

  setLine: (line) => set({ selectedLine: line }),
  setDirection: (dir) => set({ selectedDirection: dir }),
  setDestination: (dest) => set({ selectedDestination: dest }),
  setViewMode: (mode) => set({ viewMode: mode }),
  fetchArrivals: async (station: string) => {
    const arrivals = await getArrival(station);

    // console.log('봉 확인용');
    // console.log(station);
    // console.table(
    //   arrivals.map((a) => ({
    //     subwayId: a.subwayId,
    //     trainLineNm: a.trainLineNm,
    //     bstatnNm: a.bstatnNm,
    //     updnLine: a.updnLine,
    //   })),
    // );

    if (!arrivals || arrivals.length === 0) {
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
      arrivals.find((a) => a.subwayId === firstLine)?.updnLine ?? '';

    set({
      arrivals,
      selectedLine: firstLine,
      selectedDirection: firstDirection,
      selectedDestination: null,
    });
  },
}));
