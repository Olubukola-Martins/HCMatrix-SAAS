import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import {
  TSalaryComponentCalculationMode,
  TSalaryComponentInput,
} from "features/payroll/types/salaryComponents";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

// TODO: Refactor for SalaryComp Mode
type TData = {
  schemeId: number;
  type: "allowance" | "deduction";

  body: IBody;
};

type IBody = {
  name: string;
  label: string;
  mode: TSalaryComponentCalculationMode;
  amount: number | string;
} & Pick<
  TSalaryComponentInput,
  "isActive" | "isDefault" | "shouldDisplayOnReviewTable"
>;
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/scheme/${props.data.schemeId}/${props.data.type}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data:IBody = {
    ...props.data.body,
    shouldDisplayOnReviewTable: props.data.body.shouldDisplayOnReviewTable ?? false

  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddAllowanceOrDeduction = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
