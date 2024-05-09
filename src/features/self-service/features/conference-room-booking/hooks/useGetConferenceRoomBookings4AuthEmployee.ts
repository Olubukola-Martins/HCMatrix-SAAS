import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TSingleConferenceRoomBooking } from "../types";
import { TApprovalStatus } from "types/statuses";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TApprovalStatus[] | TApprovalStatus;
}

export const QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE =
  "conference-room-bookings-for-auth-employee";

const getData = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TSingleConferenceRoomBooking[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.data.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/conference-room/booking/mine`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      status:
        typeof props.data.status === "string"
          ? props.data.status
          : props.data.status?.join(","),
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TSingleConferenceRoomBooking[] = result.map(
    (item: TSingleConferenceRoomBooking): TSingleConferenceRoomBooking => ({
      ...item,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetConferenceRoomBookings4AuthEmployee = (
  props: IGetDataProps
) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams, status } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_CONFERENCE_ROOM_BOOKINGS_FOR_AUTH_EMPLOYEE,
      pagination,
      searchParams,
      status,
    ],
    () =>
      getData({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
