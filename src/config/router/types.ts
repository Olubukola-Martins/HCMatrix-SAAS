type TRouteDataCategory = "doesnt-require-authentication";

export type TRouteData = {
  path: string;
  element: JSX.Element;
  category?: TRouteDataCategory;
  title?: string;
  isSearchable: boolean;
  isPrimaryFeature?: boolean;
};
