import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TAsset } from "../types";

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_ASSETS = "assets";

const getVehicles = async (
  props: IGetDataProps
): Promise<{ data: TAsset[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset`;

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

  const data: TAsset[] = result.map((item: TAsset): TAsset => ({ ...item }));

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAssets = (props: IGetDataProps) => {
  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_ASSETS, pagination, searchParams],
    () =>
      getVehicles({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
