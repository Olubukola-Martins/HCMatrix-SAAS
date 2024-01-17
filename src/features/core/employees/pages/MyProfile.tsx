import { useApiAuth } from "hooks/useApiAuth";
import { EmployeeProfileContainer } from "../components/MyProfile/EmployeeProfileContainer";

export const MyProfile = () => {
  const { currentUserEmployeeId } = useApiAuth();

  return <EmployeeProfileContainer employeeId={currentUserEmployeeId} />;
};
