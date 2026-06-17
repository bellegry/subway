import { useSubwayStore } from '@/stores/subwayStore';
import { sortByEta } from '@/utils/sortByEta';
import { ArrivalCard } from '@/components/ArrivalCard';

// 행선지 이름 추출
export function getDestination(trainLineNm: string) {
  return trainLineNm.split(' - ')[0];
}

export function DestinationView() {
  const { arrivals, selectedLine, selectedDestination, setDestination } =
    useSubwayStore();

  // 현재 호선만
  const lineArrivals = arrivals.filter((a) => a.subwayId === selectedLine);

  // 상행 행선지
  const upDestinations = [
    ...new Set(
      lineArrivals
        .filter((a) => a.updnLine === '상행')
        .map((a) => getDestination(a.trainLineNm)),
    ),
  ];

  // 하행 행선지
  const downDestinations = [
    ...new Set(
      lineArrivals
        .filter((a) => a.updnLine === '하행')
        .map((a) => getDestination(a.trainLineNm)),
    ),
  ];

  // 선택된 행선지 TOP3
  const top3 = sortByEta(
    lineArrivals.filter(
      (a) => getDestination(a.trainLineNm) === selectedDestination,
    ),
  ).slice(0, 3);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {/* 상행 */}
        <div>
          <h3 className="font-semibold mb-2">▲ 상행</h3>

          <div className="flex flex-wrap gap-2">
            {upDestinations.map((dest) => (
              <button key={dest} onClick={() => setDestination(dest)}>
                {dest}
              </button>
            ))}
          </div>
        </div>

        {/* 하행 */}
        <div>
          <h3 className="font-semibold mb-2">▼ 하행</h3>

          <div className="flex flex-wrap gap-2">
            {downDestinations.map((dest) => (
              <button key={dest} onClick={() => setDestination(dest)}>
                {dest}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 선택된 행선지의 TOP3 */}
      {selectedDestination && (
        <ArrivalCard title={`${selectedDestination} TOP3`} arrivals={top3} />
      )}
    </div>
  );
}
