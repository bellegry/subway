import { useSubwayStore } from '@/stores/subwayStore';
import { sortByEta } from '@/utils/sortByEta';
import { ArrivalCard } from '@/components/ArrivalCard';

export function DestinationView() {
  const { arrivals, selectedLine, selectedDestination, setDestination } =
    useSubwayStore();

  // 현재 선택된 호선만
  const lineArrivals = arrivals.filter((a) => a.subwayId === selectedLine);

  // 현재 호선의 방향 목록 (상행/하행 또는 내선/외선 등)
  const directions = [...new Set(lineArrivals.map((a) => a.updnLine))];

  // 선택된 행선지 TOP3
  const top3 = sortByEta(
    lineArrivals.filter((a) => a.trainLineNm === selectedDestination),
  ).slice(0, 3);

  console.table(
    lineArrivals.map((a) => ({
      updnLine: a.updnLine,
      trainLineNm: a.trainLineNm,
      btrainNo: a.btrainNo,
    })),
  );

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        {directions.map((direction) => {
          const destinations = [
            ...new Set(
              lineArrivals
                .filter((a) => a.updnLine === direction)
                .map((a) => a.trainLineNm),
            ),
          ];

          return (
            <div key={direction}>
              <h3 className="mb-2 font-semibold">{direction}</h3>

              <div className="flex flex-wrap gap-2">
                {destinations.map((dest) => (
                  <button key={dest} onClick={() => setDestination(dest)}>
                    {dest}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {selectedDestination && (
        <ArrivalCard title={`${selectedDestination} TOP3`} arrivals={top3} />
      )}
    </div>
  );
}
