import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TAbsenteeismPolicy } from "../types";

export const QUERY_KEY_FOR_ABSENTEEISM_POLICY = "absenteeism-policy";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TAbsenteeismPolicy> => {
  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/absenteeism-policy`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const ans: TAbsenteeismPolicy = res.data.data;

  return ans;
};

export const useGetAbsenteeismPolicy = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery([QUERY_KEY_FOR_ABSENTEEISM_POLICY], () =>
    getData({
      auth: { token, companyId },
    })
  );

  return queryData;
};
