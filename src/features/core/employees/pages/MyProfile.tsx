import { IAuthDets } from "features/authentication/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useAuthUser } from "react-auth-kit";
import { EmployeeProfileContainer } from "../components/MyProfile/EmployeeProfileContainer";

export const MyProfile = () => {
  const { companyId } = useApiAuth();

  const auth = useAuthUser();
  const authDetails = auth() as unknown as IAuthDets;

  const companies = authDetails?.companies;

  const currentCompany = companies.find((item) => item.companyId === companyId);

  const employeeId = currentCompany?.id as number;

  return <EmployeeProfileContainer employeeId={+employeeId} />;
};
