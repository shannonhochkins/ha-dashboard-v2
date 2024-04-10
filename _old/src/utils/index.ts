/**
 * `wrap` accepts a range, defined as a `min` and `max`.
 *
 * When a third number is provided:
 *
 * If it lies within the range, it is returned.
 * If it lies outside the range, it is wrapped back around:
 * @example
 *   wrap(0, 1, 0.5); // 0.5
 *   wrap(0, 1, 1.5); // 0.5
 */

export const wrap = (min: number, max: number, v: number) => {
  const rangeSize = max - min;
  return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min;
};
