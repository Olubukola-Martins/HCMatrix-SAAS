export function capitalizeWord(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

// export function capitalizeWord(word: string | undefined | null) {
//   if (!word) {
//     return "";
//   }
//   return word.charAt(0).toUpperCase() + word.slice(1);
// }
