import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TConferenceRoomAnalytics } from "../types";

interface IGetDataProps extends ICurrentCompany {}
export const QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS =
  "conference-room-analytics";
const getData = async (
  props: IGetDataProps
): Promise<TConferenceRoomAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/conference-room/analytic`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {},
  };

  const res = await axios.get(url, config);
  const item: TConferenceRoomAnalytics = res.data.data;

  const data: TConferenceRoomAnalytics = {
    ...item,
  };

  return data;
};

export const useGetConferenceRoomAnalytics = (props: IGetDataProps) => {
  const queryData = useQuery(
    [QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS],
    () =>
      getData({
        ...props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
