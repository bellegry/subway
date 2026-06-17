export function getDestination(trainLineNm: string) {
  return trainLineNm.split(' - ')[0];
}
