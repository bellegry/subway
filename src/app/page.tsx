'use client';

import { useEffect } from 'react';
import { getArrival } from '@/lib/subway';

import { StationButton } from '@/components/StationButton';
import { ArrivalCard } from '@/components/ArrivalCard';

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getArrival('서울역');

      console.log('data', data);
      console.table(
        data.map((item) => ({
          subwayId: item.subwayId,
          trainLineNm: item.trainLineNm,
          btrainSttus: item.btrainSttus,
          bstatnNm: item.bstatnNm,
          arvlMsg2: item.arvlMsg2,
        })),
      );
    };

    fetchData();
  }, []);

  return (
    <main>
      <h1>지하철 앱</h1>
      <div>
        <StationButton />
        <ArrivalCard />
      </div>
    </main>
  );
}
