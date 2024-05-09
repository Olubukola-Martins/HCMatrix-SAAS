import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TApprovalStatus } from "types/statuses";
import { TLeaveRelieverApproval } from "../../types";

interface IGetDataProps {
  pagination?: IPaginationProps;
  status?: TApprovalStatus[];
}

export const QUERY_KEY_FOR_LEAVE_RELIEVER_APPROVALS =
  "leave-reliever-approvals";

const getData = async (
  props: IGetDataProps,
  auth: ICurrentCompany
): Promise<{ data: TLeaveRelieverApproval[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/reliever-approval`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      limit,
      offset,
      status: props.status?.join(","),
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TLeaveRelieverApproval[] = result.map(
    (item: TLeaveRelieverApproval): TLeaveRelieverApproval => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetLeaveRelieverApprovals = (props: IGetDataProps = {}) => {
  const { pagination, status } = props;
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_RELIEVER_APPROVALS, pagination, status],
    () =>
      getData(
        {
          ...props,
        },
        {
          token,
          companyId,
        }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
