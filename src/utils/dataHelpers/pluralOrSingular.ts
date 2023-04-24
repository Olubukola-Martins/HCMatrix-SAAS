export const pluralOrSingular = ({
  amount,
  singular,
  plural,
}: {
  amount: number;
  singular: string;
  plural: string;
}) => {
  if (amount === 0) return "no data";
  return `${amount} ${amount === 1 ? singular : plural}`;
};