import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { TSingleConferenceRoomBooking } from "../types";

// TO DO : REfactor to put department types in its appropriate place or is it needed

export const QUERY_KEY_FOR_SINGLE_CONFERENCE_ROOM_BOOKING =
  "conference-room-booking";

interface IGetDataProps {
  id: number;
}

const getSingleConferenceRoomBooking = async (
  props: IGetDataProps & ICurrentCompany
): Promise<TSingleConferenceRoomBooking> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/booking/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TSingleConferenceRoomBooking = {
    ...item,
    // ADHERES TO API
  };
  return data;
};

export const useFetchSingleConferenceRoomBooking = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_CONFERENCE_ROOM_BOOKING, props.id],
    () =>
      getSingleConferenceRoomBooking({
        ...props,
        token,
        companyId,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      // ...preventUnnecessaryRefresh
    }
  );

  return queryData;
};
