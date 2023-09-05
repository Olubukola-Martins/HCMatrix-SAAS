import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

interface applyDefaultSettingsProps {
  token: string;
  companyId: number;
}

export const applyDefaultSettings = async ({
  companyId,
  token,
}: applyDefaultSettingsProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.RECRUITMENT}/default-settings/apply`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
      "x-company-id": companyId,
    },
  };

  const response = await axios.post(url, {}, config);
  return response;
};

export const useApplyDefaultSettings = () => {
  return useMutation(applyDefaultSettings);
};
