import { TLicenseType } from "features/authentication/types/auth-user";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";

export type TRouteDataCategory =
  | "doesnt-require-authentication"
  | "doesnt-require-active-subscription";

export type TRouteData = {
  path: string;
  element: JSX.Element;
  category?: TRouteDataCategory;
  title?: string;
  isSearchable: boolean;
  isPrimaryFeature?: boolean;
  hidden?: boolean;
};

export type TAppPageDataFnProps = {
  userPermissions: TPermissionLabel[];
  licenseType?: TLicenseType;
  activeSubscription?: TCompanySubscription;
  isOwner?: boolean;
};
