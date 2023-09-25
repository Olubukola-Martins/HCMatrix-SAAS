import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCostData = {
  id: number;
};
const rollbackData = async (props: {
  data: TCostData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.data.id}/rollback`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.post(url, {}, config);
  return response;
};
export const useRollbackPayroll = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCostData) =>
    rollbackData({ data: props, auth: { token, companyId } })
  );
};
