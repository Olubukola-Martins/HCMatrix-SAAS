import { useGetCompanyActiveSubscription } from "features/billing/hooks/company/useGetCompanyActiveSubscription";
import { useApiAuth } from "./useApiAuth";
import { useGetAuthUser } from "features/authentication/hooks/useGetAuthUser";

const useMostRecentApiAuth = () => {
  const { companyId, token } = useApiAuth(); //this hook data is stale, asides from token, n companyId, cos it was last updated/created on login
  const { data, isError, isSuccess, isStale, error, isLoading } =
    useGetAuthUser(); //This hook is used so that data is not stale, but most in sync with server
  const user = data?.user;
  const {
    data: companyActiveSubscription,
    isLoading: isLoadingCompanyActiveSubscription,
  } = useGetCompanyActiveSubscription();
  const companies = data?.payload;
  const currentCompanyEmployeeDetails = companies?.find(
    (item) => item.company.id === companyId
  );
  const currentCompanyEmployeeId = currentCompanyEmployeeDetails?.id;
  const currentCompany = currentCompanyEmployeeDetails?.company;
  const currentCompanyId = currentCompany?.id;
  return {
    currentCompany,
    companies,
    user,
    currentCompanyEmployeeDetails,
    currentCompanyEmployeeId,
    currentCompanyId,
    isError,
    error,
    isLoading: isLoading || isLoadingCompanyActiveSubscription,
    isSuccess,
    isStale,
    companyActiveSubscription,
    token,
    companyId,
  };
};

export default useMostRecentApiAuth;
