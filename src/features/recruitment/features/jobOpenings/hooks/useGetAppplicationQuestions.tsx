import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import { ISettingsSwitchData } from "../../../settings/types";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const QUERY_KEY_FOR_APPLICATION_QUESTIONS =
  "RecruitApplicationQuestions";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<ISettingsSwitchData[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/application-questions`;
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

export const useGetAppplicationQuestions = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_APPLICATION_QUESTIONS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
