import { useSubwayStore } from "@/stores/subwayStore";
import { sortByEta } from "@/utils/sortArrivalsByEta";
import { ArrivalCard } from "@/components/organisms/ArrivalCard";

export function LineArrivalView() {
  const { arrivals, selectedLine } = useSubwayStore();

  // 현재 선택된 호선만
  const lineArrivals = arrivals.filter((a) => a.subwayId === selectedLine);

  const directions = [...new Set(lineArrivals.map((a) => a.updnLine))];

  const first = directions[0];
  const second = directions[1];

  // 상행
  const firstTop3 = sortByEta(
    lineArrivals.filter((a) => a.updnLine === first),
  ).slice(0, 3);

  // 하행
  const secondTop3 = sortByEta(
    lineArrivals.filter((a) => a.updnLine === second),
  ).slice(0, 3);

  console.log({
    selectedLine,
    subwayIds: [...new Set(arrivals.map((a) => a.subwayId))],
    lineArrivals,
    directions,
    first,
    second,
    firstTop3,
    secondTop3,
  });

  return (
    <div>
      <ArrivalCard title={`▲ ${first}`} arrivals={firstTop3} />
      <ArrivalCard title={`▼ ${second}`} arrivals={secondTop3} />
    </div>
  );
}
