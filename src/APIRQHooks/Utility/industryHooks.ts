import { useQuery } from "react-query";
import { getIndustries } from "../../ApiRequesHelpers/Utility/industry";
import { TIndustry } from "../../AppTypes/DataEntitities";
import { openNotification } from "../../NotificationHelpers";

export const useFetchIndustries = () => {
  const queryData = useQuery("industries", () => getIndustries(), {
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

      const data: TIndustry[] = result.map(
        (item: any): TIndustry => ({
          id: item.id,
          name: item.name,
        })
      );

      return data;
    },
  });

  return queryData;
};
