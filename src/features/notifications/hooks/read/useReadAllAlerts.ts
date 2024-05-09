import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

const createData = async (props: { auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/alert/read/all`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {};

  const response = await axios.patch(url, data, config);
  return response;
};
export const useReadAllAlerts = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(() => createData({ auth: { token, companyId } }));
};
