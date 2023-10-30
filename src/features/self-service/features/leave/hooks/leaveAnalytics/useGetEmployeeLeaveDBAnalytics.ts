import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLeaveAnalytics } from "../../types";

export const QUERY_KEY_FOR_LEAVE_EMPLOYEE_DB_ANALYTICS =
  "leave-employee-db-analytics";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TLeaveAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/analytic`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TLeaveAnalytics = res.data.data;

  const data: TLeaveAnalytics = {
    ...item,
  };

  return data;
};

export const useGetEmployeeLeaveDBAnalytics = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_EMPLOYEE_DB_ANALYTICS],
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
