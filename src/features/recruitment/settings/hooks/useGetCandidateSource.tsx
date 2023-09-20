import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICandidateStatus } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_CANDIDATE_SOURCE = "CandidateSource";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<ICandidateStatus[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/settings/application-sources`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const res = await axios.get(url, config);
  const item: ICandidateStatus[] = res.data.data.result;
  return item;
};

export const useGetCandidateSource = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_CANDIDATE_SOURCE],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
