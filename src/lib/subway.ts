import { api } from './axios';
import type { RealtimeArrival } from '@/types/subway';

interface ArrivalResponse {
  realtimeArrivalList: RealtimeArrival[];
}

export const getArrival = async (
  station: string,
): Promise<RealtimeArrival[]> => {
  const API_KEY = process.env.NEXT_PUBLIC_SUBWAY_API_KEY;

  const response = await api.get<ArrivalResponse>(
    `/${API_KEY}/json/realtimeStationArrival/0/50/${station}`,
  );

  console.log(station);
  console.log(response.data);

  return response.data.realtimeArrivalList ?? [];
};
