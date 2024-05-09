import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TAsset } from "../types";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_ASSET = "single-asset";
const getData = async (props: IGetDataProps): Promise<TAsset> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/asset/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TAsset = res.data.data;

  const data: TAsset = {
    ...item,
  };

  return data;
};

export const useGetSingleAsset = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_ASSET, props.id],
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
