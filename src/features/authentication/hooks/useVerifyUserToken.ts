import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TGeneralAuthResponse } from "../types";

export interface IVerifyUserProps {
  token: string;
  uid: string;
  email?: string;
}
export const verifyUserToken = async ({
  token,
  uid,
}: IVerifyUserProps): Promise<TGeneralAuthResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/user/verification`;

  const config = {
    params: {
      token,
      uid,
    },
  };

  const response = await axios.get(url, config);
  const result = response.data as unknown as TGeneralAuthResponse;
  return result;
};
