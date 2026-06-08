import { useSubwayStore } from "@/stores/subwayStore";
import { stationsByLine } from "@/data/subwayStation";

export function StationButton() {
  const { fetchArrivals } = useSubwayStore();

  console.log(stationsByLine["1호선"]);

  return (
    <div>
      {stationsByLine["2호선"]?.map((station) => (
        <button
          key={station.id}
          onClick={async () => {
            await fetchArrivals(station.name);
            console.log("역명:", station.name);
            console.log("호선:", station.line);
            console.log("역ID:", station.id);
          }}
        >
          {station.name}
        </button>
      ))}
    </div>
  );
}
