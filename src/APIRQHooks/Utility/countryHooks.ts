import { useQuery } from "react-query";
import { getCountries } from "../../ApiRequesHelpers/Utility/countries";
import { TCountry, TIndustry } from "../../AppTypes/DataEntitities";
import { openNotification } from "../../NotificationHelpers";

export const useFetchCountries = () => {
  const queryData = useQuery("countries", () => getCountries(), {
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

    select: (res: any) => {
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
    },
  });

  return queryData;
};
