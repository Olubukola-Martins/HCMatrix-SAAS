import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDelData = {
  type: "allowance" | "deduction";
  allowanceOrDeductionId: number;
  schemeId: number;
};
const delData = async (props: { data: TDelData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/scheme/${props.data.schemeId}/${props.data.type}/${props.data.allowanceOrDeductionId}`;
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
export const useDeleteAllowanceOrDeduction = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
