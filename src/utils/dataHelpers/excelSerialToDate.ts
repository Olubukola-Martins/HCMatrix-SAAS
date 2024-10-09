export function excelSerialToDate(
  serial: number | string | null | undefined
): string {
  if (typeof serial !== "number" || serial <= 0) {
    if (typeof serial === "string" && isValidDate(serial)) {
      //check if serial is a string that is a valid date

      return new Date(serial).toISOString();
    }
    return serial?.toString() ?? "";
  }

  // Excel's epoch date
  const epoch = new Date(1900, 0, 1);

  // Excel incorrectly treats 1900 as a leap year, so we need to adjust
  const adjustedSerial = serial - (serial >= 60 ? 1 : 0);

  // Calculate the date
  const date = new Date(epoch.getTime() + adjustedSerial * 24 * 60 * 60 * 1000);

  // Check if the date is valid
  if (isNaN(date.getTime())) {
    //   throw new RangeError("Invalid time value");
    return "";
  }

  return date.toISOString();
}

function isValidDate(dateString: string) {
  const date = new Date(dateString);
  return !isNaN(date.getTime());
}
