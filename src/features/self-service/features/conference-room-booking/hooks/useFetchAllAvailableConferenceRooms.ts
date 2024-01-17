// useFetchAllConferenceRooms

import axios from "axios";
import { useQuery } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { IPaginationProps, ISearchParams, ICurrentCompany } from "types";
import { TSingleConferenceRoom } from "../types";

// TO DO : need to exist in the general data entities and refactored
interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_AVAILABLE_CONFERENCE_ROOMS =
  "available-conference-rooms";

const getBAllConferenceRooms = async (
  props: IGetDataProps & ICurrentCompany
): Promise<{ data: TSingleConferenceRoom[]; total: number }> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/available`;

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

  const data: TSingleConferenceRoom[] = result.map(
    (item: any): TSingleConferenceRoom => ({
      id: item.id,
      name: item.name,
      label: item.label,
      companyId: item.companyId,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchAllAvailableConferenceRooms = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_AVAILABLE_CONFERENCE_ROOMS, props.pagination],
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
