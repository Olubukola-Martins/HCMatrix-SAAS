import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { TCountry } from "types/country";
import { openNotification } from "utils/notifications";

const QUERY_KEY_FOR_COUNTRIES = "countries";

export const getCountries = async (search?: string): Promise<TCountry[]> => {
  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/address/country`;

  const config = {
    params: {
      search,
    },
  };

  const res = await axios.get(url, config);
  const result = res.data.data;

  const data: TCountry[] = result.map(
    (item: any): TCountry => ({
      id: item.id,
      name: item.name,
      sortName: item.sortName,
      code: item.code,
    })
  );

  return data;
};

export const useFetchCountries = (search?: string) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_COUNTRIES, search],
    () => getCountries(search),
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
