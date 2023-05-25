import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TAssetRequisition } from "../../types/asset";
import { TApprovalStatus } from "types/statuses";

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TApprovalStatus;
  employeeId?: number;
}

export const QUERY_KEY_FOR_ASSET_REQUISITIONS = "asset-requisitions";

const getData = async (
  props: IGetDataProps
): Promise<{ data: TAssetRequisition[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/asset`;

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

  const data: TAssetRequisition[] = result.map(
    (item: TAssetRequisition): TAssetRequisition => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAssetRequisitions = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_ASSET_REQUISITIONS, props],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
