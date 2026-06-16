import { getSubwayLine } from './getSubwayLine';
import { RealtimeArrival } from '@/types/subway';

export const groupArrival = (arrivals: RealtimeArrival[]) => {
  return arrivals.reduce(
    (acc, arrival) => {
      const line = getSubwayLine(arrival.subwayId);
      const destination = arrival.bstatnNm;
      const trainType = arrival.btrainSttus;

      if (!acc[line]) {
        acc[line] = {};
      }
      if (!acc[line][destination]) {
        acc[line][destination] = {};
      }
      if (!acc[line][destination][trainType]) {
        acc[line][destination][trainType] = [];
      }
      acc[line][destination][trainType].push(arrival);
      return acc;
    },
    {} as Record<string, Record<string, Record<string, RealtimeArrival[]>>>,
  );
};
