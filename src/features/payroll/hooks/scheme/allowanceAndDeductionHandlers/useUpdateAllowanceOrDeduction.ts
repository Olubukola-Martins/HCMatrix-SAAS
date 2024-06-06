import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import {
  TSalaryComponentCalculationMode,
  TSalaryComponentInput,
} from "features/payroll/types/salaryComponents";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDelData = {
  allowanceOrDeductionId: number;
  type: "allowance" | "deduction";

  schemeId: number;
  body: IBody;
};

type IBody = {
  name: string;
  label: string;
  mode: TSalaryComponentCalculationMode;
  amount: number | string;
} & Pick<
  TSalaryComponentInput,
  "isActive" | "isDefault" | "description" | "shouldDisplayOnReviewTable"
>;
const delData = async (props: { data: TDelData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/scheme/${props.data.schemeId}/${props.data.type}/${props.data.allowanceOrDeductionId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: IBody = {
    ...props.data.body,
    shouldDisplayOnReviewTable:
      props.data.body.shouldDisplayOnReviewTable ?? false,
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
