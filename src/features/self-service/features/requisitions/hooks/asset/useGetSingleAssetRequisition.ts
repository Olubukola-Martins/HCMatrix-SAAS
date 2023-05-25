import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TAssetRequisition } from "../../types/asset";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_ASSET_REQUISITION =
  "single-asset-requisition";
const getData = async (props: IGetDataProps): Promise<TAssetRequisition> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/asset/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TAssetRequisition = res.data.data;

  const data: TAssetRequisition = {
    ...item,
  };

  return data;
};

export const useGetSingleAssetRequisition = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_ASSET_REQUISITION, props.id],
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
