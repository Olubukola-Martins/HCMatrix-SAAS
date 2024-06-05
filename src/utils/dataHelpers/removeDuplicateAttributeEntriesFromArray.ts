type Item = Record<string, any>;

export function removeDuplicateAttributeEntriesFromArray<T extends Item>(
  array: T[],
  attribute: keyof T
): T[] {
  const seen = new Set<any>();
  return array.filter((item) => {
    const value = item[attribute];
    if (seen.has(value)) {
      return false;
    } else {
      seen.add(value);
      return true;
    }
  });
}
