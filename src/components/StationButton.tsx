import SUBWAY_LINE from '@/data/subwayLine';
import { stationsByLine } from '@/data/subwayStation';
import { useSubwayStore } from '@/stores/subwayStore';

import { cn } from '@/utils/cn';
import { button } from '@/ui/styles/button';

export function StationButton() {
  const { selectedLine, setLine, setStation, fetchArrivals } = useSubwayStore();

  return (
    <div>
      {/* 호선 선택 */}
      <div className="mb-4 flex gap-2 overflow-x-auto">
        {Object.entries(SUBWAY_LINE)
          // 실제 데이터가 있는 호선만 표시
          .filter(([subwayId]) => stationsByLine[subwayId]?.length > 0)
          .map(([subwayId, lineName]) => (
            <button
              key={subwayId}
              onClick={() => setLine(subwayId)}
              className={cn(
                'rounded px-3 py-1',
                selectedLine === subwayId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              )}
            >
              {lineName}
            </button>
          ))}
      </div>

      {/* 선택한 호선의 역 목록 */}
      <div className="flex flex-wrap gap-2">
        {(stationsByLine[selectedLine] ?? []).map((station) => (
          <button
            key={station.statnId}
            className={cn(button({ variant: 'default', size: 'sm' }), 'w-fit')}
            onClick={async () => {
              setStation(station);
              await fetchArrivals(station);
            }}
          >
            {station.displayName}
          </button>
        ))}
      </div>
    </div>
  );
}
