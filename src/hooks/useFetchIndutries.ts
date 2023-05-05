import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { TIndustry } from "types/industry";
import { openNotification } from "utils/notifications";

const QUERY_KEY_FOR_INDUSTRIES = "industries";
export const getIndustries = async (): Promise<TIndustry[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/industry`;

  const res = await axios.get(url);
  const result = res.data.data;

  const data: TIndustry[] = result.map(
    (item: any): TIndustry => ({
      id: item.id,
      name: item.name,
    })
  );

  return data;
};

export const useFetchIndustries = () => {
  const queryData = useQuery(QUERY_KEY_FOR_INDUSTRIES, () => getIndustries(), {
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
  });

  return queryData;
};
