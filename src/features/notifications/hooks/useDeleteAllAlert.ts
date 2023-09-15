import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  employeeId: number;
};
const delData = async (props: { data: TData; auth: ICurrentCompany }) => {
  // const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/alert/all/${props.data.employeeId}`;
  const url = `${MICROSERVICE_ENDPOINTS.NOTIFICATION}/alert/all/`;
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
  const { token, companyId, currentUserEmployeeId } = useApiAuth();
  return useMutation(() =>
    delData({
      data: { employeeId: currentUserEmployeeId },
      auth: { token, companyId },
    })
  );
};
