import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TAssetAnalytics } from "../types";

interface IGetDataProps extends ICurrentCompany {
  year?: string;
}
export const QUERY_KEY_FOR_ASSET_ANALYTICS = "asset-analytics";
const getData = async (props: IGetDataProps): Promise<TAssetAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset/analytic`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      year: props?.year,
    },
  };

  const res = await axios.get(url, config);
  const item: TAssetAnalytics = res.data.data;

  const data: TAssetAnalytics = {
    ...item,
  };

  return data;
};

export const useGetAssetAnalytics = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_ASSET_ANALYTICS, props.year],
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
