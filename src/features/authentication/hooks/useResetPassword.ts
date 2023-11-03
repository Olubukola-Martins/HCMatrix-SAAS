import axios from "axios";
import { useMutation } from "react-query";
import { IResetUserPProps, TGeneralAuthResponse } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const resetUserPassword = async (
  props: IResetUserPProps
): Promise<TGeneralAuthResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/reset-password?token=${props.token}&uid=${props.uid}`;
  const config = {
    headers: {
      Accept: "application/json",
    },
  };

  const data: any = {
    password: props.password,
    confirmPassword: props.confirmPassword,
  };

  const response = await axios.post(url, data, config);
  const result = response.data as unknown as TGeneralAuthResponse;
  return result;
};

export const useResetPassword = () => {
  return useMutation(resetUserPassword);
};
