import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TEmployeeLicenseCountLeft } from "features/billing/types/company/employeeLicense/count/employeeLicenseCountLeft";
import { getCompanyActiveSubscription } from "../../useGetCompanyActiveSubscription";

export const QUERY_KEY_FOR_EMPLOYEE_LICENSE_COUNT_LEFT =
  "employee-license-count-left";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TEmployeeLicenseCountLeft> => {
  const res = await getCompanyActiveSubscription({
    auth: props.auth,
  });

  const data: TEmployeeLicenseCountLeft = {
    licensedEmployeeCountLeft: res?.licensedEmployeeCount || 0,
    unlicensedEmployeeCountLeft: res?.unlicensedEmployeeCount || 0,
  };

  return data;
};

export const useGetEmployeeLicenseCountLeft = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_EMPLOYEE_LICENSE_COUNT_LEFT],
    () =>
      getData({
        auth: { token, companyId },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
