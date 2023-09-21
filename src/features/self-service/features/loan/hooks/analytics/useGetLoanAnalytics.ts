import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLoanAnalytics } from "../../types";
import { TApprovalStatus } from "types/statuses";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";

export const QUERY_KEY_FOR_LOAN_ANALYTICS = "loan-analytics";

type TData = { year?: string; status?: TApprovalStatus[] };
const getData = async (props: {
  type: "me" | "all";
  data?: TData;
  auth: ICurrentCompany;
}): Promise<TLoanAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/analytic/${props.type}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      status:
        props.data?.status?.join(",") ??
        APPROVAL_STATUS_OPTIONS.map((item) => item.value).join(","),
    },
  };

  const res = await axios.get(url, config);
  const item: TLoanAnalytics = res.data.data;

  const data: TLoanAnalytics = {
    ...item,
  };

  return data;
};

export const useGetLoanAnalytics = (values: {
  props?: TData;
  type: "me" | "all";
}) => {
  const { token, companyId } = useApiAuth();
  const { props, type } = values;
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_ANALYTICS, type, props?.status, props?.year],
    () =>
      getData({
        type,
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
