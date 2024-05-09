import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TGeneralAuthResponse } from "../types";

export const o365MicrosoftRedirectUrl = async ({
  code,
  client_info,
  session_state,
}: {
  code: string;
  session_state: string;
  client_info: string;
}): Promise<TGeneralAuthResponse> => {
  let url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/authenticate/social/microsoft`;

  url += `?code=${code}&client_info=${client_info}&session_state=${session_state}`;
  const response = await axios.get(url);
  const result = response.data as unknown as TGeneralAuthResponse;
  return result;
};
