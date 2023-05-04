import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export interface IVerifyUserProps {
  token: string;
  uid: string;
  email?: string;
}
export const verifyUserToken = async ({ token, uid }: IVerifyUserProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/user/verification`;

  const config = {
    params: {
      token,
      uid,
    },
  };

  const response = await axios.get(url, config);
  return response;
};
