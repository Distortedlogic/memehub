export const getRatio = (ups: number, downs: number) => {
  if (ups + downs === 0) return 1;
  return Math.round((ups / (ups + downs + Number.EPSILON)) * 1000) / 1000;
};
