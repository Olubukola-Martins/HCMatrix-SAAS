import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TNotification, TNotificationType } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { APP_AUTHORIZATION_TOKEN_FOR_FCM_TOKEN_ENDPOINT } from "config/firebase/messaging";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  type?: TNotificationType;
  // fireBaseToken: string; //might just need to exist in getNotifications on its own so need
  employeeId: number;
}

export const QUERY_KEY_FOR_NOTIFICATIONS = "notifications";

const getNotifications = async (
  props: IGetDataProps
): Promise<{ data: TNotification[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/alert`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${APP_AUTHORIZATION_TOKEN_FOR_FCM_TOKEN_ENDPOINT}`,
      "x-company-id": props.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      type: props.type,
      employeeId: props.employeeId,
      // fireBaseToken: props.fireBaseToken,
    },
  };

  const res = await axios.get(url, config);
  console.log("NOTIF", res);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TNotification[] = result.map(
    (item: TNotification): TNotification => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchNotifications = (
  props: Pick<IGetDataProps, "pagination" | "searchParams" | "type">
) => {
  const { pagination, searchParams } = props;
  const { token, currentUserEmployeeId, companyId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_NOTIFICATIONS, pagination, searchParams],
    () =>
      getNotifications({
        token,
        employeeId: currentUserEmployeeId,
        companyId,
        // fireBaseToken,
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
