import React from "react";
import { TPermissionLabel } from "features/core/roles-and-permissions/types";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";

export const canUserAccessComponent = ({
  userPermissions,
  requiredPermissions,
}: {
  userPermissions: TPermissionLabel[];
  requiredPermissions: TPermissionLabel[];
}) => {
  let canAccess = false;

  canAccess = userPermissions?.some((item) =>
    requiredPermissions?.includes(item)
  );

  return canAccess;
};

export const useGetUserPermissions = () => {
  const { currentCompanyEmployeeDetails } = useMostRecentApiAuth();
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
  };
};
export const useCanUserAccessComponent = (props: {
  requiredPermissions: TPermissionLabel[];
}) => {
  const { requiredPermissions } = props;
  const { userPermissions } = useGetUserPermissions();

  return {
    canAccess: canUserAccessComponent({
      userPermissions,
      requiredPermissions,
    }),
    userPermissions,
  };
};

export const PermissionRestrictor: React.FC<{
  children: React.ReactNode;
  requiredPermissions: TPermissionLabel[];
}> = ({ requiredPermissions, children }) => {
  const { userPermissions } = useGetUserPermissions();

  return (
    <>
      {canUserAccessComponent({
        userPermissions,
        requiredPermissions,
      }) ? (
        <>{children}</>
      ) : null}
    </>
  );
};
