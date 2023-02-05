export const roundPrice = (num: number) =>
  Math.round(num * 100 + Number.EPSILON) / 100;
