import { useSubwayStore } from '@/stores/subwayStore';
import { getSubwayLine } from '@/utils/getSubwayLine';

export function ArrivalCard() {
  const { arrivals } = useSubwayStore();

  if (arrivals.length === 0) {
    return <div>도착 정보가 없습니다.</div>;
  }

  return (
    <div className="flex flex-col gap-2">
      {arrivals.map((arrival) => (
        <div
          key={`${arrival.subwayId}-${arrival.trainLineNm}-${arrival.arvlMsg2}`}
          className="rounded-md border p-3 shadow-sm"
        >
          <div className="text-sm font-semibold">
            {getSubwayLine(arrival.subwayId)}
          </div>

          <div className="text-base">{arrival.bstatnNm}행</div>

          <div className="text-sm text-zinc-500">{arrival.arvlMsg2}</div>
        </div>
      ))}
    </div>
  );
}
