import { useParams } from "react-router-dom";

import { EmployeeProfileContainer } from "./EmployeeProfileContainer";

export const EmployeeProfile = () => {
  const params = useParams();
  const employeeId = params.id as string;
  return <EmployeeProfileContainer employeeId={+employeeId} />;
};
