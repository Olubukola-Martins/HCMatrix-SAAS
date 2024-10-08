import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TAssetRequisition } from "features/self-service/features/requisitions/types/asset";
import { TApprovalStatus } from "types/statuses";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TApprovalStatus[];
}

export const QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE =
  "asset-requisitions-for-auth-employee";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TAssetRequisition[]; total: number }> => {
  const { pagination, status } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/asset/mine`;

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
      status: status?.join(","),
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TAssetRequisition[] = result.map(
    (item: TAssetRequisition): TAssetRequisition => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAssetRequisitions4AuthEmployee = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, status } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_ASSET_REQUISITIONS_FOR_AUTH_EMPLOYEE,
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
