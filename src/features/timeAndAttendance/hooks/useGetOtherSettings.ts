import axios from "axios";
import { useQuery } from "react-query";
import { IOtherSettings } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";

export const QUERY_KEY_FOR_COMPANY_POLICY = "companyPolicy";

const getData = async (props: ICurrentCompany): Promise<IOtherSettings> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/general`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: IOtherSettings = res.data.data;
  const data: IOtherSettings = {
    ...item,
  };

  return data;
};
export const useGetOtherSettings = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_COMPANY_POLICY],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
