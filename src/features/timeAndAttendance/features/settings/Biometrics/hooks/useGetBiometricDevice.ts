import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { biometricProps } from "../types";

export const QUERY_KEY_FOR_BIOMETRIC_DEVICE = "Biometric_Device";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<biometricProps[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/biometrics/devices`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: biometricProps[] = res.data.data.result;
  return item;
};
export const useGetBiometricDevice = () => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_BIOMETRIC_DEVICE],
    () => getData({ token, companyId }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
