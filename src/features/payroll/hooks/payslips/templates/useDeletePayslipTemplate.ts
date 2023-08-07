import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCostData = {
  id: number;
};
const delData = async (props: { data: TCostData; auth: ICurrentCompany }) => {
  // TO DO: Correct when back end is set, just a hypothesis
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payslip/template/${props.data.id}`;
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
export const useDeletePayslipTemplate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCostData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
