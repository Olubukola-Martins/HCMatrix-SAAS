export const formatPhoneNumber = ({
  code,
  number,
}: {
  code: string;
  number: string;
}) => {
  return `${code}-${number}`;
};
