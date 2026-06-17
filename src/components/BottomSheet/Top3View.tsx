import { useSubwayStore } from '@/stores/subwayStore';
import { sortByEta } from '@/utils/sortByEta';
import { ArrivalCard } from '@/components/ArrivalCard';

export function Top3View() {
  const { arrivals, selectedLine } = useSubwayStore();

  // 현재 선택된 호선만
  const lineArrivals = arrivals.filter((a) => a.subwayId === selectedLine);

  // 상행
  const up = sortByEta(lineArrivals.filter((a) => a.updnLine === '상행')).slice(
    0,
    3,
  );

  // 하행
  const down = sortByEta(
    lineArrivals.filter((a) => a.updnLine === '하행'),
  ).slice(0, 3);

  console.log({
    selectedLine,
    subwayIds: [...new Set(arrivals.map((a) => a.subwayId))],
    lineArrivals,
  });

  return (
    <div>
      <ArrivalCard title="▲ 상행" arrivals={up} />
      <ArrivalCard title="▼ 하행" arrivals={down} />
    </div>
  );
}
