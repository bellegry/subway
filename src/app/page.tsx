"use client";

import { useEffect } from "react";
import { getArrival } from "@/lib/subway";

export default function Home() {
  useEffect(() => {
    const fetchData = async () => {
      const data = await getArrival("서울역");

      console.log(data);
    };

    fetchData();
  }, []);

  return <main>지하철 앱</main>;
}
