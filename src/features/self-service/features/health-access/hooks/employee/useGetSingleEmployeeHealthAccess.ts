import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TSingleEmployeeHealthAccess } from "../../types/employee";

interface IDataProps {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS =
  "single-employee-health-access";
const getData = async (props: {
  data: IDataProps;
  auth: ICurrentCompany;
}): Promise<TSingleEmployeeHealthAccess> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/employee/${props.data.id}`;

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

export const useGetSingleEmployeeHealthAccess = (props: IDataProps) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_EMPLOYEE_HEALTH_ACCESS, props.id],
    () =>
      getData({
        auth: {
          companyId,
          token,
        },
        data: { ...props },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
