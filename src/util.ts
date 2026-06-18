export function convertTime(duration: number): [string, number, number, number] {
  const truncate = (decimal: number, n: number): string => {
    const power: number = Math.pow(10, n);
    const truncated:number = Math.trunc(decimal * power) / power;
    return truncated.toFixed(2);
  }

  if (duration < 0) throw new RangeError();

  let leftover: number = duration;

  let hours: number = Math.floor(leftover / 3600);
  leftover -= hours * 3600;

  let minutes: number = Math.floor(leftover / 60);
  leftover -= minutes * 60;

  let result: string = "";
  if (hours > 0) {
    result += String(hours) + ":";

    result += minutes < 10
      ? "0" + String(minutes) + ":"
      : String(minutes) + ":";

    result += leftover < 10
      ? "0" + truncate(leftover, 2)
      : truncate(leftover, 2);
  } else if (minutes > 0) {
    result += String(minutes) + ":";
    
    result += leftover < 10
      ? "0" + truncate(leftover, 2)
      : truncate(leftover, 2);
  } else {
    result += truncate(leftover, 2);
  }
  return [result, hours, minutes, leftover];
}

export function isNumericOrEmpty(str: string): boolean {
  return str == "" || (!isNaN(Number(str)) && isFinite(Number(str)) && Number(str) >= 0);
};

export function isIntegerOrEmpty(str: string): boolean {
  return str == "" || (!isNaN(Number(str)) && isFinite(Number(str)) && Number.isInteger(Number(str)) && Number(str) >= 0);
};

export function isISODateOrEmpty(str: string): boolean {
  return str == "" || /^\d{4}-\d{2}-\d{2}$/.test(str);
};

export function hmsToSeconds(hours: string, minutes: string, seconds: string): number {
  let result: number = 0;

  if (hours != "") result += 3600 * Number(hours);
  if (minutes != "") result += 60 * Number(hours);
  if (seconds != "") result += Number(seconds);

  return result
}