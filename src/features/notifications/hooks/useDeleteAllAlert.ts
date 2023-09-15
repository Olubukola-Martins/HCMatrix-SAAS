import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

const delData = async (props: { auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/alert/all`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useDeleteAllAlert = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(() =>
    delData({
      auth: { token, companyId },
    })
  );
};
