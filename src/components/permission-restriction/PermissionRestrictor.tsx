import React from "react";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";
import { TCompanySubscription } from "features/billing/types/company/companySubscription";
import {
  TSubscriptionLabel,
  TSubscriptionResourceLabel,
} from "features/billing/types/subscription";

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
  requiredSubscriptionState?: {
    label?: TSubscriptionLabel;
    resources?: TSubscriptionResourceLabel[];
  };
}) => {
  let canAccess = false;
  // check subscription first
  let canAccessViaSubscription = !!activeSubscription?.purchased.some(
    (item) => {
      if (item.subscription.type === "module") {
        return item.subscription.label === requiredSubscriptionState?.label;
      }
      if (item.subscription.type === "plan") {
        return item.subscription.resources?.some((resource) =>
          requiredSubscriptionState?.resources?.includes(
            resource.resource.label
          )
        );
      }
      return false;
    }
  );
  // then check permissions
  let canAccessViaPermissions = !!userPermissions?.some((item) =>
    requiredPermissions?.includes(item)
  );
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
}) => {
  const { requiredPermissions } = props;
  const { userPermissions, companyActiveSubscription } =
    useGetUserPermissions();

  return {
    canAccess: canUserAccessComponent({
      userPermissions,
      requiredPermissions,
      activeSubscription: companyActiveSubscription,
    }),
    userPermissions,
  };
};

export const PermissionRestrictor: React.FC<{
  children: React.ReactNode;
  requiredPermissions: TPermissionLabel[];
}> = ({ requiredPermissions, children }) => {
  const { userPermissions, companyActiveSubscription } =
    useGetUserPermissions();

  return (
    <>
      {canUserAccessComponent({
        userPermissions,
        requiredPermissions,
        activeSubscription: companyActiveSubscription,
      }) ? (
        <>{children}</>
      ) : null}
    </>
  );
};
