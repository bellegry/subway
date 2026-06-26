"use client";

import { StationSelector } from "@/components/organisms/StationSelector";
import { LineTab } from "@/components/organisms/BottomSheet/LineTab";
import { ViewModeToggle } from "@/components/organisms/BottomSheet/ViewModeToggle";
import { LineArrivalView } from "@/components/organisms/BottomSheet/LineArrivalView";
import { DestinationView } from "@/components/organisms/BottomSheet/DestinationView";

import { useSubwayStore } from "@/stores/subwayStore";

export default function Home() {
  const { arrivals, viewMode } = useSubwayStore();

  return (
    <main>
      <h1>지하철 앱</h1>

      <StationSelector />

      {arrivals.length > 0 && (
        <div>
          <LineTab />
          <ViewModeToggle />

          {viewMode === "top3" ? <LineArrivalView /> : <DestinationView />}
        </div>
      )}
    </main>
  );
}
