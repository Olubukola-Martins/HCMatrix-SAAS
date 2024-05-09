import axios from "axios";
import { useQuery } from "react-query";

import { useApiAuth } from "hooks/useApiAuth";
import { IPaginationProps, ISearchParams, ICurrentCompany } from "types";
import { TSingleConferenceRoomBooking } from "../types";
import { TApprovalStatus } from "types/statuses";

export type TCRBookingStatus = "pending" | "approved" | "rejected";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  employeeId?: number;
  status?: TApprovalStatus[] | TApprovalStatus;
}

export const QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS =
  "conference-room-bookings";

const getAllConferenceRooms = async (
  props: IGetDataProps,
  auth: ICurrentCompany
): Promise<{ data: TSingleConferenceRoomBooking[]; total: number }> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/booking`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },

    params: {
      limit: props?.pagination?.limit,
      offset: props?.pagination?.offset,
      search: props?.searchParams?.name,
      employeeId: props.employeeId,
      status:
        typeof props.status === "string"
          ? props.status
          : props.status?.join(","),
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
    [QUERY_KEY_FOR_ALL_CONFERENCE_ROOM_BOOKINGS, props],
    () =>
      getAllConferenceRooms(
        {
          ...props,
        },
        { token, companyId }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
