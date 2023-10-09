import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ISearchParams } from "types";
import { TLga } from "types/lgas";
import { openNotification } from "utils/notifications";

export const QUERY_KEY_FOR_LGA = "lga";

export interface ILgaProps {
  stateId?: number;
  searchParams?: ISearchParams;
}
export const getLgas = async ({
  stateId,
  searchParams,
}: ILgaProps): Promise<TLga[]> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/address/lga`;
  const config = {
    params: {
      stateId,
      search: searchParams?.name,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TLga[] = result.map(
    (item: any): TLga => ({
      id: item.id,
      name: item.name,
      stateId: item.stateId,
    })
  );

  return data;
};

// Get states by LGA
export const useFetchLgas = ({ stateId, searchParams }: ILgaProps = {}) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_LGA, stateId, searchParams?.name],
    () => getLgas({ stateId, searchParams }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
    }
  );

  return queryData;
};
