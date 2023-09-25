import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TRateData = {
  id: number;
  body: {
    currency: string;
    rate: number;
  };
};
const createData = async (props: {
  data: TRateData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/exchange-rate/${props.data.id}`;
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
export const useUpdateExchangeRate = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TRateData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
