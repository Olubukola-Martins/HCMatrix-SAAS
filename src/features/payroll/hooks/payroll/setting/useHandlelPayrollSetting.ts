import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollSchemeType } from "features/payroll/types/payrollSchemes";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TPayrolSettingData = {
  companyBankDetails?: CompanyBankDetails;
  loanConfiguration: LoanConfiguration;
  payslipTemplate: PayslipTemplate;
};

interface PayslipTemplate {
  templateId: number;
}

interface LoanConfiguration {
  isActive: boolean;
  schemes: TPayrollSchemeType[];
  timeFrameForManualRepayment?: {
    startDay: number; // min of 1, max of 25
    endDay: number; // min of 1, max of 25
  };
}

interface CompanyBankDetails {
  bankName: string;
  bankCode: string;
  accountNumber: string;
  accountName?: string;
}

type TData = {
  data: TPayrolSettingData;
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/setting`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TPayrolSettingData = {
    ...props.data.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useHandlelPayrollSetting = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
