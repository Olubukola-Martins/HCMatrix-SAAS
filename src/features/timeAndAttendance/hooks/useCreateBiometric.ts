import axios from "axios";
import { useMutation } from "react-query";
import { biometricProps } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const createData = async (props: {
  data: biometricProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/biometrics/devices/multiple`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = props.data;

  const response = await axios.put(url, data, config);
  return response;
};

export const useCreateBiometric = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: biometricProps }) =>
    createData({ data: props.data, auth: { companyId, token } })
  );
};
