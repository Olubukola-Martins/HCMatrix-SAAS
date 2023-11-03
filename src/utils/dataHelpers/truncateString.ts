export const truncateString = (value: string, maxLength?: number): string => {
  // Define the default maximum length if not provided
  const DEFAULT_MAX_LENGTH = 12;

  // Use the provided maxLength if it's a positive number, or use the default
  maxLength =
    typeof maxLength === "number" && maxLength > 0
      ? maxLength
      : DEFAULT_MAX_LENGTH;

  // Check if the value is longer than the specified maxLength
  if (value.length > maxLength) {
    // Truncate the string and add an ellipsis to indicate truncation
    return value.slice(0, maxLength) + "...";
  }

  // If the string is not longer than the maxLength, return it as is
  return value;
};
