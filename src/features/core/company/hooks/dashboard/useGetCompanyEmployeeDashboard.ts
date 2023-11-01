import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";

import { useApiAuth } from "hooks/useApiAuth";
import { TCompanyEmployeeDashboard } from "../../types/companyDashboard";

export const QUERY_KEY_FOR_COMPANY_EMPLOYEE_DASHBOARD =
  "company-dashboard-employee";
const getData = async (
  auth: ICurrentCompany
): Promise<TCompanyEmployeeDashboard> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/dashboard/employee`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TCompanyEmployeeDashboard = res.data.data;

  const data: TCompanyEmployeeDashboard = {
    ...item,
  };

  return data;
};

export const useGetCompanyEmployeeDashboard = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_EMPLOYEE_DASHBOARD],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
