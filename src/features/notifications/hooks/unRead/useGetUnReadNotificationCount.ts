import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {}

export const QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT =
  "unread-notification-count";

const getNotifications = async (
  props: IGetDataProps
): Promise<{ unreadCount: number }> => {
  const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/alert/unread`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: { unreadCount: number } = res.data.data;

  const data: { unreadCount: number } = {
    ...item,
  };

  return data;
};

export const useGetUnReadNotificationCount = () => {
  const { token, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_UNREAD_NOTIFICATION_COUNT],
    () =>
      getNotifications({
        token,
        companyId,
      }),
    {
      // refetchInterval: 4,
      onError: (err: any) => {},
      onSuccess: (data) => {
        // openNotification({
        //   state: "success",
        //   title: "Success",
        //   description: `You have ${data.unreadCount} notifications`,
        //   duration: 3,
        // });
      },
    }
  );

  return queryData;
};
