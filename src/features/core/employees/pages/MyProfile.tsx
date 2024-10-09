import { useApiAuth } from "hooks/useApiAuth";
import { EmployeeProfileContainer } from "../components/MyProfile/EmployeeProfileContainer";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

export const MyProfile = () => {
  const { currentUserEmployeeId } = useApiAuth();
  const { userPermissions, isOwner } = useGetUserPermissions();
  const canEditProfile =
    isOwner ||
    canUserAccessComponent({
      userPermissions,
      requiredPermissions: ["manage-employees"],
    });

  return (
    <EmployeeProfileContainer
      employeeId={currentUserEmployeeId}
      isOwner={canEditProfile}
    />
  );
};
