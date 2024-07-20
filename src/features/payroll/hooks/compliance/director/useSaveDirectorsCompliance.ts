import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TDirectorsCompliance } from "features/payroll/types/compliance";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = Pick<TDirectorsCompliance, "directors">;
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/compliance/bvn`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveDirectorsCompliance = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
