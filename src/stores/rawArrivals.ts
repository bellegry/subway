import { useSubwayStore } from '@/stores/subwayStore';
import { sortByEta } from '@/utils/sortByEta';
import { groupByDirection } from '@/utils/groupByDirection';
import { groupByDestination } from '@/utils/groupByDestination';

export const useLineView = () => {
  const { arrivals, selectedLine, selectedDirection, selectedDestination } =
    useSubwayStore();

  // 1. 선택된 호선의 도착 정보만 필터링
  const lineFiltered = arrivals.filter((a) =>
    a.subwayId.startsWith(selectedLine),
  );

  // 2. 행선지별 그룹화
  const byDirection = groupByDirection(lineFiltered);

  // 3. 선택된 행선지의 도착 정보만 필터링
  const directionList = byDirection[selectedDirection] ?? [];

  // 2b. 목적지별 그룹화 (누락된 부분)
  const byDestination = groupByDestination(directionList);

  // 4. 목적지별 그룹화
  const top3 = selectedDestination
    ? sortByEta(byDestination[selectedDestination] ?? []).slice(0, 3)
    : [];

  // 5. 선택된 목적지의 도착 정보만 필터링
  return {
    byDirection,
    byDestination,
    top3,
  };
};
