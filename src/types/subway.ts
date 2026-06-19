export interface RealtimeArrival {
  subwayId: string;

  statnId: string; // 현재 역 ID
  statnNm: string; // 현재 역명

  statnFid: string; // 이전 역 ID
  statnTid: string; // 다음 역 ID

  bstatnId: string; // 종착역 ID
  bstatnNm: string; // 종착역명

  trainLineNm: string;
  barvlDt: string;
  arvlMsg2: string;
  btrainSttus: string;
  btrainNo: string;
  ordkey: string;
  updnLine: string;
}
