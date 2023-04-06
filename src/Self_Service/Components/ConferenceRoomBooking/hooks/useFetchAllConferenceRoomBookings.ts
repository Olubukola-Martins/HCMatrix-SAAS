// useFetchAllConferenceRooms

import { ICurrentCompany } from "AppTypes/DataEntitities";

import axios from "axios";
import { useApiAuth } from "Hooks/useApiAuth";
import { useQuery } from "react-query";
import { IPaginationProps } from "AppTypes/Pagination";
import { ISearchParams } from "AppTypes/Search";
import { TSingleConferenceRoomBooking } from "./useFetchSingleConferenceRoomBooking";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS =
  "conference-room-bookings";

const getBAllConferenceRooms = async (
  props: IGetDataProps & ICurrentCompany
): Promise<{ data: TSingleConferenceRoomBooking[]; total: number }> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/booking`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },

    params: {
      limit: props?.pagination?.limit,
      offset: props?.pagination?.offset,
      search: props?.searchParams?.name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TSingleConferenceRoomBooking[] = result.map(
    (item: any): TSingleConferenceRoomBooking => ({
      ...item,
      // Adheres to backend
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchAllConferenceRoomBookings = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();
  // TO DO: Add searchPArams to useQuery hook
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS,
      props.pagination,
      props.searchParams,
    ],
    () =>
      getBAllConferenceRooms({
        ...props,
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
