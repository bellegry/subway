import { useSubwayStore } from '@/stores/subwayStore';
import { stationsByLine } from '@/data/subwayStation';

import { cn } from '@/utils/cn';
import { button } from '@/ui/styles/button';

export function StationButton() {
  const { fetchArrivals } = useSubwayStore();

  console.log(stationsByLine['1호선']);

  return (
    <div>
      {stationsByLine['1호선']?.map((station) => (
        <button
          key={station.id}
          className={cn(
            button({ variant: 'default', size: 'sm' }),
            'w-fit mb-2 mr-2',
          )}
          onClick={async () => {
            await fetchArrivals(station.name);
            console.log('역명:', station.name);
            console.log('호선:', station.line);
            console.log('역ID:', station.id);
          }}
        >
          {station.name}
        </button>
      ))}
    </div>
  );
}
