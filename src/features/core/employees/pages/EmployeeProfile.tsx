import { useParams } from "react-router-dom";
import { EmployeeProfileContainer } from "../components/MyProfile/EmployeeProfileContainer";
import {
  canUserAccessComponent,
  useGetUserPermissions,
} from "components/permission-restriction/PermissionRestrictor";

export const EmployeeProfile = () => {
  const params = useParams();
  const employeeId = params.id as string;
  const { userPermissions, isOwner } = useGetUserPermissions();
  return (
    <EmployeeProfileContainer
      employeeId={+employeeId}
      isOwner={
        isOwner ||
        canUserAccessComponent({
          userPermissions,
          requiredPermissions: ["manage-employees"],
        })
      } //this is made optional, so that users more than user (isOwner) is capable of editing employee info directly, and those with the stated permission above can do so
    />
  );
};
