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
  let canAccess: boolean = false;
  const activeSubscriptionWasNotDefined = activeSubscription === undefined;
  // check subscription first
  let canAccessViaSubscription = (): boolean => {
    if (activeSubscriptionWasNotDefined) {
      return false;
    }
    if (activeSubscription.type === "plan") {
      canAccess = activeSubscription.plan.modules.some((item) => {
        const labelWasNotDefined =
          requiredSubscriptionState?.label === undefined;
        return labelWasNotDefined
          ? true
          : item.label === requiredSubscriptionState?.label;
      });
      return canAccess;
    }
    if (activeSubscription.type === "module") {
      canAccess = activeSubscription.modules.some((item) => {
        const labelWasNotDefined =
          requiredSubscriptionState?.label === undefined;
        return labelWasNotDefined
          ? true
          : item.label === requiredSubscriptionState?.label;
      });
      return canAccess;
    }
    return false;
  };
  const requiredPermissionsWereNotDefined =
    requiredPermissions === undefined || requiredPermissions.length === 0;
  // then check permissions
  let canAccessViaPermissions = requiredPermissionsWereNotDefined
    ? true
    : !!userPermissions?.some((item) => requiredPermissions?.includes(item));
  canAccess = canAccessViaSubscription() && canAccessViaPermissions;
  return canAccess;
};

export const useGetUserPermissions = () => {
  const {
    currentCompanyEmployeeDetails,
    companyActiveSubscription,
    isError,
    isLoading,
    isSuccess,
  } = useMostRecentApiAuth();
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
    isError,
    isLoading,
    isSuccess,
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
