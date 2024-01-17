export type TAddOn = {
  name: string;
  title: string;
  options: Option[];
};

interface Option {
  label: string;
  value: string;
}
