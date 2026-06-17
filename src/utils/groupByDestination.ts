import { RealtimeArrival } from '@/types/subway';

// 행선지별 그룹화 (목적지 기준)
export function getDestination(trainLineNm: string) {
  return trainLineNm.split(' - ')[0];
}

export function groupByDestination(list: RealtimeArrival[]) {
  return list.reduce(
    (acc, cur) => {
      const dest = getDestination(cur.trainLineNm);

      acc[dest] ??= [];
      acc[dest].push(cur);

      return acc;
    },
    {} as Record<string, RealtimeArrival[]>,
  );
}
