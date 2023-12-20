import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TEmployeeLicenseCountLeft } from "features/billing/types/company/employeeLicense/count/employeeLicenseCountLeft";

export const QUERY_KEY_FOR_EMPLOYEE_LICENSE_COUNT_LEFT =
  "employee-license-count-left";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TEmployeeLicenseCountLeft> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/subscription/company/employee-license/count`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data as TEmployeeLicenseCountLeft;

  const data: TEmployeeLicenseCountLeft = result;

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
