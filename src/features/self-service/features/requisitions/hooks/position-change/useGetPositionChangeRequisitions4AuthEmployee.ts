import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TApprovalStatus } from "types/statuses";
import { TPositionChangeRequisition } from "../../types/positionChange";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TApprovalStatus[] | TApprovalStatus;
}

export const QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE =
  "position-change-requisitions-for-auth-employee";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TPositionChangeRequisition[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/position-change/mine`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      status:
        typeof props.data.status === "string"
          ? props.data.status
          : props.data.status?.join(","),
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TPositionChangeRequisition[] = result.map(
    (item: TPositionChangeRequisition): TPositionChangeRequisition => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetPositionChangeRequisitions4AuthEmployee = (
  props: IGetDataProps
) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, status } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_POSITION_CHANGE_REQUISITIONS_FOR_AUTH_EMPLOYEE,
      pagination,
      searchParams,
      status,
    ],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
