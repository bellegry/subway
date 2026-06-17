'use client';

import { StationButton } from '@/components/StationButton';
import { LineTab } from '@/components/BottomSheet/LineTab';
import { ViewModeToggle } from '@/components/BottomSheet/ViewModeToggle';
import { Top3View } from '@/components/BottomSheet/Top3View';
import { DestinationView } from '@/components/BottomSheet/DestinationView';

import { useSubwayStore } from '@/stores/subwayStore';

export default function Home() {
  const { arrivals, viewMode } = useSubwayStore();

  return (
    <main>
      <h1>지하철 앱</h1>

      <StationButton />

      {arrivals.length > 0 && (
        <div>
          <LineTab />
          <ViewModeToggle />

          {viewMode === 'top3' ? <Top3View /> : <DestinationView />}
        </div>
      )}
    </main>
  );
}
