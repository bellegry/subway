import { useSubwayStore } from '@/stores/subwayStore';
import { getSubwayLine } from '@/utils/getSubwayLine';

export function ArrivalCard() {
  const { arrivals } = useSubwayStore();

  // console.log('도착 정보:', arrivals);
  console.log(arrivals);

  if (arrivals.length === 0) {
    return <div>도착 정보가 없습니다.</div>;
  }

  // 중복 제거를 위해 btrainNo, ordkey, trainLineNm, arvlMsg2를 기준으로 객체 생성
  const duplicate = arrivals.map((a) => ({
    btrainNo: a.btrainNo,
    ordkey: a.ordkey,
    trainLineNm: a.trainLineNm,
    arvlMsg2: a.arvlMsg2,
    bstatnNm: a.bstatnNm,
  }));

  console.table(duplicate);

  return (
    <div className="flex flex-col gap-2">
      {arrivals.map((arrival) => (
        <div
          key={`${arrival.ordkey}-${arrival.trainLineNm}-${arrival.arvlMsg2}`}
          className="rounded-md border p-3 shadow-sm"
        >
          <div className="text-sm font-semibold">
            {getSubwayLine(arrival.ordkey)}
          </div>

          <div className="text-base">{arrival.bstatnNm}행</div>

          <div className="text-sm text-zinc-500">{arrival.arvlMsg2}</div>
        </div>
      ))}
    </div>
  );
}
