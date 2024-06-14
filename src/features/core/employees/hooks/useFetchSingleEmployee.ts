import { ICurrentCompany } from "types";
import axios from "axios";
import { useQuery } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TSingleEmployee } from "../types";

export const QUERY_KEY_FOR_SINGLE_EMPLOYEE = "single-employee";

export const getSingleEmployee = async (
  props: ICurrentCompany & { employeeId?: number }
): Promise<TSingleEmployee> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TSingleEmployee = res.data.data;

  const data: TSingleEmployee = {
    ...item,
  };

  return data;
};
export const useFetchSingleEmployee = ({
  employeeId,
}: {
  employeeId?: number;
}) => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_EMPLOYEE, employeeId],
    () =>
      getSingleEmployee({
        companyId,
        token,
        employeeId,
      }),

    {
      enabled: !!employeeId,
      onError: (err: any) => {},
    }
  );

  return queryData;
};
