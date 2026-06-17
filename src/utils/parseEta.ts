export function parseEta(msg: string): number {
  if (!msg) return 999;
  if (msg.includes('도착')) return 0;

  const min = msg.match(/(\d+)\s*분/);
  if (min) return Number(min[1]);

  const sec = msg.match(/(\d+)\s*초/);
  if (sec) return Number(sec[1]) / 60;

  return 999;
}
