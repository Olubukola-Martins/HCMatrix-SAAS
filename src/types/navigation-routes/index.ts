export type TNavRoute = {
  title: string;
  path?: string;
  children?: TNavRoute[];
  hidden: boolean;
};
