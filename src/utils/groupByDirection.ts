import { RealtimeArrival } from '@/types/subway';

// 행선지별 그룹화
export function groupByDirection(list: RealtimeArrival[]) {
  return list.reduce(
    (acc, cur) => {
      const dir = cur.updnLine ?? 'UNKNOWN';
      acc[dir] ??= [];
      acc[dir].push(cur);
      return acc;
    },
    {} as Record<string, RealtimeArrival[]>,
  );
}
