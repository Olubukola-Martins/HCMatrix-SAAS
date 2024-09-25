import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TPayrollWalletPaymentProvider } from "features/payroll/types/wallet";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  payrollId: number;
  data: {
    walletProvider: TPayrollWalletPaymentProvider;
  };
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.data.payrollId}/disbursement`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData["data"] = {
    ...props.data.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useInitiateManualDisbursement = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
