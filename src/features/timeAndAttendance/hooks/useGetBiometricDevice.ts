import axios from "axios";
import { useQuery } from "react-query";
import { BiometricDevice, } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_BIOMETRIC_DEVICE = "Biometric_Device";

const getData = async (props: {
  token: string;
  companyId: number;
}): Promise<BiometricDevice[]> => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/all-biometric-device/${props.companyId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };
  const res = await axios.get(url, config);

  const item: BiometricDevice[] = res.data;
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
