export function capitalizeWord(_word?: string) {
  const word = _word || ""
  return word?.charAt(0).toUpperCase() + word?.slice(1);
}

// export function capitalizeWord(word: string | undefined | null) {
//   if (!word) {
//     return "";
//   }
//   return word.charAt(0).toUpperCase() + word.slice(1);
// }
