import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TAllLoanAnalytics } from "../../types/analytic";

export const QUERY_KEY_FOR_LOAN_ANALYTICS = "loan-analytics";

const getData = async (props: {
  type: "mine" | "all";
  auth: ICurrentCompany;
}): Promise<TAllLoanAnalytics> => {
  const acceptedUrl = props.type === "mine" ? "analytic/mine" : "analytic";

  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/${acceptedUrl}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TAllLoanAnalytics = res.data.data;

  const data: TAllLoanAnalytics = {
    ...item,
  };

  return data;
};

export const useGetLoanAnalytics = (values: {
  type: "mine" | "all";
}) => {
  const { token, companyId } = useApiAuth();
  const { type } = values;
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_ANALYTICS, type],
    () =>
      getData({
        type,
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
