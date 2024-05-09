import React from "react";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import {
  TSubscriptionLabel,
  TSubscriptionResourceLabel,
} from "features/billing/types/subscription";

type TRequiredSubscriptionState = {
  label?: TSubscriptionLabel;
  resources?: TSubscriptionResourceLabel[];
};
// TODO: Put a default active subscription state from local storage
export const canUserAccessComponent = ({
  userPermissions,
  requiredPermissions,
  activeSubscription,
  requiredSubscriptionState,
}: {
  userPermissions: TPermissionLabel[];
  requiredPermissions: TPermissionLabel[];
  activeSubscription?: TCompanySubscription;
  requiredSubscriptionState?: TRequiredSubscriptionState;
}) => {
  let canAccess = false;
  const activeSubscriptionWasNotDefined = activeSubscription === undefined;
  // check subscription first
  let canAccessViaSubscription = activeSubscriptionWasNotDefined
    ? true
    : !!activeSubscription?.purchased.some((item) => {
        if (item.subscription.type === "module") {
          const labelWasNotDefined =
            requiredSubscriptionState?.label === undefined;
          return labelWasNotDefined
            ? true
            : item.subscription.label === requiredSubscriptionState?.label;
        }
        if (item.subscription.type === "plan") {
          const resourcesWereNotDefined =
            item.subscription.resources === undefined ||
            item.subscription.resources?.length === 0;
          return resourcesWereNotDefined
            ? true
            : item.subscription.resources?.some((resource) =>
                requiredSubscriptionState?.resources?.includes(
                  resource.resource.label
                )
              );
        }
        return false;
      });
  const requiredPermissionsWereNotDefined =
    requiredPermissions === undefined || requiredPermissions.length === 0;
  // then check permissions
  let canAccessViaPermissions = requiredPermissionsWereNotDefined
    ? true
    : !!userPermissions?.some((item) => requiredPermissions?.includes(item));
  canAccess = canAccessViaSubscription && canAccessViaPermissions;
  return canAccess;
};

export const useGetUserPermissions = () => {
  const { currentCompanyEmployeeDetails, companyActiveSubscription } =
    useMostRecentApiAuth();
  const licenseType = currentCompanyEmployeeDetails?.licenseType;
  const userPermissionsViaRole =
    currentCompanyEmployeeDetails?.role?.permissions?.map(
      (item) => item.permission.label
    ) ?? [];
  const userPermissionsViaDelegations =
    currentCompanyEmployeeDetails?.delegation?.permissions?.map(
      (item) => item.permission.label
    ) ?? [];

  return {
    userPermissions: [
      ...userPermissionsViaRole,
      ...userPermissionsViaDelegations,
    ],
    licenseType,
    isOwner: !!currentCompanyEmployeeDetails?.isOwner,
    companyActiveSubscription,
  };
};
export const useCanUserAccessComponent = (props: {
  requiredPermissions: TPermissionLabel[];
  requiredSubscriptionState?: TRequiredSubscriptionState;
}) => {
  const { requiredPermissions, requiredSubscriptionState } = props;
  const { userPermissions, companyActiveSubscription } =
    useGetUserPermissions();

  return {
    canAccess: canUserAccessComponent({
      userPermissions,
      requiredPermissions,
      activeSubscription: companyActiveSubscription,
      requiredSubscriptionState,
    }),
    userPermissions,
  };
};

export const PermissionRestrictor: React.FC<{
  children: React.ReactNode;
  requiredPermissions: TPermissionLabel[];
  requiredSubscriptionState?: TRequiredSubscriptionState;
}> = ({ requiredPermissions, requiredSubscriptionState, children }) => {
  const { userPermissions, companyActiveSubscription } =
    useGetUserPermissions();

  return (
    <>
      {canUserAccessComponent({
        userPermissions,
        requiredPermissions,
        activeSubscription: companyActiveSubscription,
        requiredSubscriptionState,
      }) ? (
        <>{children}</>
      ) : null}
    </>
  );
};
