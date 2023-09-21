import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ISettingsSwitchData } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_RECRUIT_NOTIFICATIONS = "RecruitNotifications";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<ISettingsSwitchData[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/notifications`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: ISettingsSwitchData[] = res.data.data.result;
  return item;
};


export const useGetNotifications = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_RECRUIT_NOTIFICATIONS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};

