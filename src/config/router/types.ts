import { TLicenseType } from "features/authentication/types/auth-user";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";

export type TRouteDataCategory = "doesnt-require-authentication";

export type TRouteData = {
  path: string;
  element: JSX.Element;
  category?: TRouteDataCategory;
  title?: string;
  isSearchable: boolean;
  isPrimaryFeature?: boolean;
  hidden?: boolean;
};

type TSubscription = {};
export type TAppPageDataFnProps = {
  userPermissions: TPermissionLabel[];
  licenseType?: TLicenseType;
  subscription?: TSubscription;
};
