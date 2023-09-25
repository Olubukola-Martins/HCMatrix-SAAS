import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TRateData = {
  currency: string;
  rate: number;
};
const createData = async (props: {
  data: TRateData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/exchange-rate`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TRateData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateExchageRate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TRateData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
