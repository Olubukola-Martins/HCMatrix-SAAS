import axios from "axios";
import { useMutation } from "react-query";
import { IResetUserPProps } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const resetUserPassword = async (props: IResetUserPProps) => {
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
  return response;
};

export const useResetPassword = () => {
  return useMutation(resetUserPassword);
};
