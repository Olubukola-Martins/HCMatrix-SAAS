import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { IJobOpeningData } from "../types";

export const QUERY_KEY_FOR_JOB_OPENINGS = "JobOpenings";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<IJobOpeningData[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/jobs`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);
  const item: IJobOpeningData[] = res.data.data.result;
  return item;
};


export const useGetJobOpenings = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_JOB_OPENINGS],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
