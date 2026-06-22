export function normalizeStationName(name: string): string {
  return name.trim().replace(/\s+/g, '').replace(/역$/, '');
}
