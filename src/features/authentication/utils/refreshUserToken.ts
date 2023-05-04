import axios from "axios";
import { IRefreshTokenProps } from "../types";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const refreshUserToken = async ({
  refreshToken,
  token,
}: IRefreshTokenProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/token/refresh`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
    params: {
      refreshToken,
    },
  };
  const response = await axios.get(url, config);
  return response;
};
