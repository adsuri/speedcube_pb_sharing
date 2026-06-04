export function convertTime(duration: number) {
  const truncate = (decimal: number, n: number): string => {
    let power = Math.pow(10, n);
    const truncated = Math.trunc(decimal * power) / power;
    return truncated.toFixed(2);
  }

  if (duration < 0) throw new RangeError();

  let leftover = duration;

  let hours = leftover % 3600;
  leftover -= hours * 3600;

  let minutes = leftover % 60;
  leftover -= minutes * 60;

  let result: string = "";
  if (hours > 0) {
    result += String(hours) + ":";
    result += String(minutes) + ":";
    result += truncate(leftover, 2);
  } else if (minutes > 0) {
    result += String(minutes) + ":";
    result += truncate(leftover, 2);
  } else {
    result += truncate(leftover, 2);
  }

  return result;
}