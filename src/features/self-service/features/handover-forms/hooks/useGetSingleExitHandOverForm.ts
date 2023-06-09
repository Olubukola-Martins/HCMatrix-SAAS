import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TTHandOverForm } from "../types";

interface IGetDataProps extends ICurrentCompany {
  id: number;
}
export const QUERY_KEY_FOR_SINGLE_ASSET_TYPE = "single-asset-type";
const getData = async (props: IGetDataProps): Promise<TTHandOverForm> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/exit-handover-form/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: TTHandOverForm = res.data.data;

  const data: TTHandOverForm = {
    ...item,
  };

  return data;
};

export const useGetSingleExitHandOverForm = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_ASSET_TYPE, props.id],
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
