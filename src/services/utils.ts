export const sortString = (a: string, b: string) => {
  const strA = a.toLowerCase();
  const strB = b.toLowerCase();
  if (strA < strB) return -1
  return strA > strB ? 1 : 0;
}