import { useQuery } from "react-query";
import { getIndustries } from "../../ApiRequesHelpers/Utility/industry";
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
  });

  return queryData;
};
