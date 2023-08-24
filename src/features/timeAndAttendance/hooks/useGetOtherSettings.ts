import axios from "axios";
import { useQuery } from "react-query";
import { IOtherSettings } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_COMPANY_POLICY = "companyPolicy";

const getData = async (props: { token: string }): Promise<IOtherSettings> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/talent-profile`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
    },
  };
  const res = await axios.get(url, config);
  const item: IOtherSettings = res.data;
  const data: IOtherSettings = {
    ...item,
  };

  return data;
};
export const useGetTalentProfile = () => {
    const { companyId, token, currentUserId } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_POLICY],
    () => getData({ token }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
