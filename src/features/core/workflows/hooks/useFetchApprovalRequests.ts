import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import { IPaginationProps, ICurrentCompany, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TWorkflowApprovalType } from "../types";
import { TApprovalRequest } from "../types/approval-requests";

export const QUERY_KEY_FOR_APPROVAL_REQUESTS = "approval-requests";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  type: TWorkflowApprovalType;
}

const getData = async (
  props: IGetDataProps & ICurrentCompany
): Promise<{
  data: TApprovalRequest[];
  total: number;
  componentHeadersToDisplay?: string[];
}> => {
  const { pagination, type } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/approval/request/${type}/`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TApprovalRequest[] = result.map(
    (item: TApprovalRequest): TApprovalRequest => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData?.totalCount,
    componentHeadersToDisplay: fetchedData?.componentHeadersToDisplay,
  };

  return ans;
};

export const useFetchApprovalRequests = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_APPROVAL_REQUESTS, props.pagination],
    () =>
      getData({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
