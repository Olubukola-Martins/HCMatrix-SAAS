import axios from "axios";
import { useQuery } from "react-query";
import { TSingleConferenceRoom } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";

export const QUERY_KEY_FOR_SINGLE_CONFERENCE_ROOM = "conference-room";

interface IGetDataProps {
  id: number;
}

const getSingleConferenceRoom = async (
  props: IGetDataProps & ICurrentCompany
): Promise<TSingleConferenceRoom> => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/conference-room/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item = res.data.data;

  const data: TSingleConferenceRoom = {
    id: item.id,
    name: item.name,
    label: item.label,
    companyId: item.companyId,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
  };
  return data;
};

export const useFetchSingleConferenceRoom = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_CONFERENCE_ROOM, props.id],
    () =>
      getSingleConferenceRoom({
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
