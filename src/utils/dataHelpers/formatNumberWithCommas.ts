export function formatNumberWithCommas(number: number | string, minimumFractionDigits?:number) {
  return number.toLocaleString("en-US", { minimumFractionDigits: minimumFractionDigits ?? 2 });
}
