import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ISwapPartnerApprovals } from "../types";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_MY_SWAP_PARTNER_APPROVAL = "MySwapPartnerApproval";

export const getEmployeePerShift = async (props: {
  auth: ICurrentCompany;
  pagination?: IPaginationProps;
  status?: string;
}): Promise<{ data: ISwapPartnerApprovals[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/shift-swap/partner-approval`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      status: props.status,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data.result;

  const result = fetchedData;

  const data: ISwapPartnerApprovals[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetSwapPartnerApprovals = ({
  pagination,
  status,
}: {
  pagination?: IPaginationProps;
  status?: string;
} = {}) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_MY_SWAP_PARTNER_APPROVAL, pagination, status],
    () =>
      getEmployeePerShift({
        auth: { token, companyId },
        pagination,
        status,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
