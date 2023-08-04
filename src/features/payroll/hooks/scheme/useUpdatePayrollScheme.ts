import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TSchemeData = {
  name: string;
  type: TPayrollSchemeType;
  frequency: "monthly" | "daily" | number;
  allowDisbursement: boolean;
  disbursement: number;
  allowApproval: boolean;
  workflowId: number;
  costCentreId: number;
  issuePayslip: boolean;
  runAutomatically: boolean;
  automaticRunDay: number | string;
};

const createData = async (props: {
  schemeId: number;
  data: TSchemeData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/scheme/${props.schemeId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TSchemeData = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdatePayrollScheme = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { body: TSchemeData; schemeId: number }) =>
    createData({
      data: props.body,
      schemeId: props.schemeId,
      auth: { token, companyId },
    })
  );
};
