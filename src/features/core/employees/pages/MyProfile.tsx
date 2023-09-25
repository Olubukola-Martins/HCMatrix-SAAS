import { IAuthDets } from "features/authentication/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useAuthUser } from "react-auth-kit";
import { EmployeeProfileContainer } from "../components/MyProfile/EmployeeProfileContainer";

export const MyProfile = () => {
  const { currentUserEmployeeId } = useApiAuth();

  return <EmployeeProfileContainer employeeId={currentUserEmployeeId} />;
};
