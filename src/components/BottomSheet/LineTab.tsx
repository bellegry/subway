import { useSubwayStore } from '@/stores/subwayStore';
import { getSubwayLine } from '@/utils/getSubwayLine';
import SUBWAY_LINE from '@/data/subwayLine';

export function LineTab() {
  const { arrivals, selectedLine, selectedDirection, setLine } =
    useSubwayStore();

  // 탭 자동 생성
  const lineTabs = Object.keys(SUBWAY_LINE).filter((subwayId) =>
    arrivals.some((a) => a.subwayId === subwayId),
  );

  const lineArrivals = arrivals.filter((a) => a.subwayId === selectedLine);

  // 방향 탭 자동 생성
  const directionTabs = [...new Set(lineArrivals.map((a) => a.updnLine))];

  // 행선지 탭 자동 생성
  const directionArrivals = lineArrivals.filter(
    (a) => a.updnLine === selectedDirection,
  );

  const destinationTabs = [
    ...new Set(directionArrivals.map((a) => a.trainLineNm.split(' - ')[0])),
  ];

  return (
    <div>
      {lineTabs.map((line) => (
        <button key={line} onClick={() => setLine(line)}>
          {getSubwayLine(line)}
        </button>
      ))}
    </div>
  );
}
