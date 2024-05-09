import axios from "axios";
import { IForgotPasswordProps } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const forgetPassword = async (props: IForgotPasswordProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/forgot-password`;

  const data = props;

  const response = await axios.post(url, data);
  return response;
};
