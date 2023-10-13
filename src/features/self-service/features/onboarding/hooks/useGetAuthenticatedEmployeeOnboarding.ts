import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TOnboarding } from "../types";

export const QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_ONBOARDING =
  "authenticated-employee-onboarding";
const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TOnboarding> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/onboarding/mine`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TOnboarding = res.data.data;

  const data: TOnboarding = {
    ...item,
  };

  return data;
};

export const useGetAuthenticatedEmployeeOnboarding = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_AUTHENTICATED_EMPLOYEE_ONBOARDING],
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
