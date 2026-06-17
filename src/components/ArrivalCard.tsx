import { getDestination } from '@/utils/groupByDestination';
import type { RealtimeArrival } from '@/types/subway';

interface ArrivalCardProps {
  title?: string;
  arrivals: RealtimeArrival[];
}

export function ArrivalCard({ title, arrivals }: ArrivalCardProps) {
  if (arrivals.length === 0) {
    return <div>도착 정보가 없습니다.</div>;
  }

  // // 중복 제거를 위해 btrainNo, ordkey, trainLineNm, arvlMsg2를 기준으로 객체 생성
  // const duplicate = arrivals.map((a) => ({
  //   btrainNo: a.btrainNo,
  //   ordkey: a.ordkey,
  //   trainLineNm: a.trainLineNm,
  //   arvlMsg2: a.arvlMsg2,
  //   bstatnNm: a.bstatnNm,
  // }));

  // console.table(duplicate);

  return (
    <div>
      {title && <h3 className="mb-2 text-lg font-semibold">{title}</h3>}

      <div className="flex flex-col gap-2">
        {arrivals.map((arrival) => (
          <div
            key={`${arrival.ordkey}-${arrival.trainLineNm}-${arrival.arvlMsg2}`}
            className="rounded-md border p-3 shadow-sm"
          >
            {/* 카드 내용 */}
            <div className="flex justify-between">
              <span className="font-semibold">
                {getDestination(arrival.trainLineNm)}
              </span>
              <span>{arrival.btrainSttus}</span>
            </div>

            <div className="mt-1 text-sm text-zinc-500">{arrival.arvlMsg2}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
