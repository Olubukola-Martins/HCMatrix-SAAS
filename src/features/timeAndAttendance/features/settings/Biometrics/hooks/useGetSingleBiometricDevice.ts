import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { biometricProps } from "../types";

export const QUERY_KEY_FOR_SINGLE_BIOMETRIC = "singleBiometric";

const getData = async (props: {
  auth: ICurrentCompany;
  id: number;
}): Promise<biometricProps> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/biometrics/devices/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: biometricProps = res.data.data;
  const data: biometricProps = {
    ...item,
  };

  return data;
};
export const useGetSingleBiometricDevice = (id: number) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_SINGLE_BIOMETRIC, id],
    () => getData({ id, auth: { token, companyId } }),
    {
      enabled: !!id,
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
