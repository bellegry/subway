// 노선 번호가 0으로 시작하는 경우 제거
export const normalizeLine = (line: string) => {
  return line.replace(/^0/, '');
};
