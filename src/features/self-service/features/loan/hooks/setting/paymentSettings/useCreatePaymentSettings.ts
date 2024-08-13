import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { ILoanPaymentSettings } from "../../../types/setting";

export const createData = async (props: {
  data: ILoanPaymentSettings;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting/payment`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
   
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreatePaymentSettings = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: ILoanPaymentSettings) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
