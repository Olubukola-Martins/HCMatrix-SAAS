import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const loginUserWithMicrosoft = async () => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/social/microsoft`;

  // necessary to make immediate changes when in  a central place when schema changes

  const response = await axios.post(url);
  return response;
};
