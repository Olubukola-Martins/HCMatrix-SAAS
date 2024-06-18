import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLatenessPolicy } from "../types";

export const QUERY_KEY_FOR_LATENESS_POLICY = "lateness-policy";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TLatenessPolicy> => {
  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/lateness-policy`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const ans: TLatenessPolicy = res.data.data;

  return ans;
};

export const useGetLatenessPolicy = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery([QUERY_KEY_FOR_LATENESS_POLICY], () =>
    getData({
      auth: { token, companyId },
    })
  );

  return queryData;
};
