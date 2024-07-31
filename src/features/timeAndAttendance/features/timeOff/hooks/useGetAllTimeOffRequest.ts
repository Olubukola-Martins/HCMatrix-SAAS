import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ITimeOffProps } from "../types";
import { IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_TIME_OFF = "TIME_OFF_FOR_APPROVAL";

const getData = async (props: {
  token: string;
  companyId: number;
  pagination?: IPaginationProps;
  status?: string;
  empUid: string;
  policyId?: number;
}): Promise<{ data: ITimeOffProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off-requests`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      status: props.status,
      empUid: props.empUid,
      policyId: props.policyId,
    },
  };

  const res = await axios.get(url, config);

  console.log("time-off", res);

  const fetchedData = res.data.data;

  const result = fetchedData.result;

  const data: ITimeOffProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetAllTimeOffRequest = (props?: {
  pagination?: IPaginationProps;
  status?: string;
  policyId?: number;
}) => {
  const { companyId, token, currentCompanyEmployeeDetails } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_TIME_OFF, props?.pagination, props?.status, props?.policyId],
    () =>
      getData({
        token,
        companyId,
        pagination: props?.pagination,
        status: props?.status,
        policyId: props?.policyId,
        empUid: currentCompanyEmployeeDetails?.empUid || "",
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
