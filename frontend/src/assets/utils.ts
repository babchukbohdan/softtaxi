export function randomInteger(min: number, max: number): number {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}
