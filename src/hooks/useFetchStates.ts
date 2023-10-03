import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ISearchParams } from "types";
import { TState } from "types/states";
import { openNotification } from "utils/notifications";

const QUERY_KEY_FOR_STATES = "states";

export interface IStateProps {
  countryId?: number;
  searchParams?: ISearchParams;
}

export const getStates = async ({
  countryId,
  searchParams,
}: IStateProps): Promise<TState[]> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/address/state/${countryId}`;
  const config = {
    params: {
      search: searchParams?.name,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TState[] = result.map(
    (item: any): TState => ({
      id: item.id,
      name: item.name,
      countryId: item.countryId,
    })
  );

  return data;
};

export const useFetchStates = ({ countryId, searchParams }: IStateProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_STATES, countryId, searchParams?.name],
    () => getStates({ countryId, searchParams }),
    {
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      enabled: !!countryId,
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
