export const generateHexColor = (input: string | number): string => {
  // Convert the input string to a hash code
  const data = `${input}`;
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = data.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Generate a hex color from the hash
  const color = (hash & 0x00ffffff).toString(16).toUpperCase();

  // Pad the color code with zeros if needed
  return "#" + "00000".substring(0, 6 - color.length) + color;
};
