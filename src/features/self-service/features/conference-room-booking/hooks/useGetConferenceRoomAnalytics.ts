import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TConferenceRoomAnalytics } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {}
export const QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS =
  "conference-room-analytics";
const getData = async (
  auth: ICurrentCompany,
  props: IGetDataProps
): Promise<TConferenceRoomAnalytics> => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/conference-room/analytic`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
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

export const useGetConferenceRoomAnalytics = (props: IGetDataProps = {}) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_CONFERENCE_ROOM_ANALYTICS],
    () =>
      getData(
        { companyId, token },
        {
          ...props,
        }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
