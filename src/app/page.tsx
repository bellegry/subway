"use client";

import { StationButton } from "@/components/organisms/StationButton";
import { LineTab } from "@/components/organisms/BottomSheet/LineTab";
import { ViewModeToggle } from "@/components/organisms/BottomSheet/ViewModeToggle";
import { Top3View } from "@/components/organisms/BottomSheet/Top3View";
import { DestinationView } from "@/components/organisms/BottomSheet/DestinationView";

import { useSubwayStore } from "@/stores/subwayStore";

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

          {viewMode === "top3" ? <Top3View /> : <DestinationView />}
        </div>
      )}
    </main>
  );
}
