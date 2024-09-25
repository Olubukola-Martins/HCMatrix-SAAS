import { useParams } from "react-router-dom";
import { EmployeeProfileContainer } from "../components/MyProfile/EmployeeProfileContainer";
import useMostRecentApiAuth from "hooks/useMostRecentApiAuth";

export const EmployeeProfile = () => {
  const params = useParams();
  const employeeId = params.id as string;
  const { currentCompanyEmployeeDetails: user } = useMostRecentApiAuth();
  return (
    <EmployeeProfileContainer
      employeeId={+employeeId}
      isOwner={user?.isOwner}
    />
  );
};
