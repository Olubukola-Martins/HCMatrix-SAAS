import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDelData = {
  allowanceOrDeductionId: number;
  schemeId: number;
  body: TBody;
};
interface TBody {
  name: string;
  label: string;
  mode: string;
  amount: number;
  isActive: boolean;
}
const delData = async (props: { data: TDelData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/scheme/${props.data.schemeId}/type/${props.data.allowanceOrDeductionId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...props.data.body,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateAllowanceOrDeduction = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
