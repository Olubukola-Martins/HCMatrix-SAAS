import { useMutation } from "react-query";
import { IUserLoginProps } from "../types";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const loginUser = async (props: IUserLoginProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate`;

  // necessary to make immediate changes when in  a central place when schema changes
  const data = { ...props };

  const response = await axios.post(url, data);
  return response;
};

export const useLoginUser = () => {
  return useMutation(loginUser);
};
