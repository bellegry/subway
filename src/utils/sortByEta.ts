import { RealtimeArrival } from '@/types/subway';
import { parseEta } from './parseEta';

export function sortByEta(list: RealtimeArrival[]) {
  return [...list].sort((a, b) => parseEta(a.arvlMsg2) - parseEta(b.arvlMsg2));
}
