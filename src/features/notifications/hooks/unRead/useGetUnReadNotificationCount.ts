import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
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
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
