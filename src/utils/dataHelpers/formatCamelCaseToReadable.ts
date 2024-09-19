export function formatCamelCaseToReadable(input: string): string {
  return input
    .replace(/([A-Z])/g, " $1") // Insert space before each capital letter
    .trim() // Remove any leading/trailing spaces
    .toLowerCase() // Convert the whole string to lowercase
    .replace(/^./, (str) => str.toUpperCase()); // Capitalize the first letter
}

// Example usage
const result = formatCamelCaseToReadable("alternativeEmail");
console.log(result); // Output: "Alternative email"
