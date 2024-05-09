import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { settingsBreakProps } from "../types";

export const QUERY_KEY_FOR_SINGLE_BREAK_POLICY = "singleBiometric";

const getData = async (props: {
  auth: ICurrentCompany;
  id: number;
}): Promise<settingsBreakProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/break-policies/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: settingsBreakProps = res.data.data;
  const data: settingsBreakProps = {
    ...item,
  };

  return data;
};
export const useGetSingleBreakPolicy = (id: number) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_BREAK_POLICY, id],
    () => getData({ id, auth: { token, companyId } }),
    {
      enabled: !!id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
