export const pluralOrSingular = ({
  amount,
  singular,
  plural,
}: {
  amount: number;
  singular: string;
  plural: string;
}) => {
  if (amount === 0) {
    return "no employees";
  }
  if (amount === 1) {
    return "1 " + singular;
  }
  if (amount > 1) {
    return amount + " " + plural;
  }
};
