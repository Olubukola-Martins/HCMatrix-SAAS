import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TApprovalStatus } from "types/statuses";
import { APPROVAL_STATUS_OPTIONS } from "constants/statustes";
import { GraphData } from "../../types/analytic";

export const QUERY_KEY_FOR_LOAN_GRAPH_ANALYTICS = "loan--graph-analytics";

type TData = { year?: string; status?: TApprovalStatus[] };
const getData = async (props: {
  data?: TData;
  auth: ICurrentCompany;
}): Promise<GraphData> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/analytic/graph`;

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
      year: props.data?.year,
    },
  };

  const res = await axios.get(url, config);
  const item: GraphData = res.data.data;

  const data: GraphData = {
    ...item,
  };

  return data;
};

export const useGetGraphData = (values: { props?: TData }) => {
  const { token, companyId } = useApiAuth();
  const { props } = values;
  const queryData = useQuery(
    [QUERY_KEY_FOR_LOAN_GRAPH_ANALYTICS, props?.status, props?.year],
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
