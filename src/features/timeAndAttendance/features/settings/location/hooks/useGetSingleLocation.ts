import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { locationProps } from "../types";

export const QUERY_KEY_FOR_SINGLE_LOCATION = "singleLocation";

const getData = async (props: {
  auth: ICurrentCompany;
  id: number;
}): Promise<locationProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/branch-locations/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: locationProps = res.data.data;
  const data: locationProps = {
    ...item,
  };

  return data;
};
export const useGetSingleLocation = (id: number) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_LOCATION, id],
    () => getData({ id, auth: { token, companyId } }),
    {
      enabled: !!id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
