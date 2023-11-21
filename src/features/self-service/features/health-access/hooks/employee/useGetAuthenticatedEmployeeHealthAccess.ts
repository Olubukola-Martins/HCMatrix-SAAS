import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSingleEmployeeHealthAccess } from "../../types/employee";

export const QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS =
  "authenticated-employee-health-access";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TSingleEmployeeHealthAccess> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/employee/mine`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSingleEmployeeHealthAccess = res.data.data;

  const data: TSingleEmployeeHealthAccess = {
    ...item,
  };

  return data;
};

export const useGetAuthenticatedEmployeeHealthAccess = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_HEALTH_ACCESS],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
