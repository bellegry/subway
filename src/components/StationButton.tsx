import SUBWAY_LINE from '@/data/subwayLine';
import { useSubwayStore } from '@/stores/subwayStore';
import { stationsByLine } from '@/data/subwayStation';

import { cn } from '@/utils/cn';
import { button } from '@/ui/styles/button';

export function StationButton() {
  const { setLine, selectedLine, fetchArrivals } = useSubwayStore();

  return (
    <div>
      {/* 1. 라인 탭 (SUBWAY_LINE의 순서대로 정렬되어 출력됨) */}
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {Object.entries(SUBWAY_LINE)
          .filter(([_, lineName]) => stationsByLine[lineName]?.length > 0) // 데이터가 있는 노선만
          .map(([code, name]) => (
            <button
              key={code}
              onClick={() => setLine(name)}
              className={cn(
                'px-3 py-1 rounded',
                selectedLine === name
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300',
              )}
            >
              {name}
            </button>
          ))}
      </div>

      {/* 2. 선택된 라인의 역 버튼 */}
      <div>
        {stationsByLine[selectedLine]?.map((station) => (
          <button
            key={station.id}
            className={cn(
              button({ variant: 'default', size: 'sm' }),
              'w-fit mb-2 mr-2',
            )}
            onClick={async () => {
              await fetchArrivals(station);
              console.log('역명:', station.name);
              console.log('호선:', station.line);
              console.log('역ID:', station.id);
            }}
          >
            {station.name}
          </button>
        ))}
      </div>
    </div>
  );
}
