import { useMutation } from "react-query";
import { IUserLoginProps, TGeneralAuthResponse } from "../types";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const loginUser = async (
  props: IUserLoginProps
): Promise<TGeneralAuthResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate`;

  const data = { ...props };

  const response = await axios.post(url, data);
  const result = response.data as unknown as TGeneralAuthResponse;
  return result;
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};
