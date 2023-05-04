import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const o365MicrosoftRedirectUrl = async ({
  code,
  client_info,
  session_state,
}: {
  code: string;
  session_state: string;
  client_info: string;
}) => {
  let url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/social/microsoft`;

  // necessary to make immediate changes when in  a central place when schema changes

  url += `?code=${code}&client_info=${client_info}&session_state=${session_state}`;
  const response = await axios.get(url);
  return response;
};
