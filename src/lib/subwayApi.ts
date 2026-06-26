import { api } from "./apiClient";
import type { RealtimeArrival } from "@/types/subway.types";

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

  console.log(response.data.realtimeArrivalList?.[0]);

  return response.data.realtimeArrivalList ?? [];
};
