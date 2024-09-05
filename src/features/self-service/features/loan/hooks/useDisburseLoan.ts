import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { IDisburseLoanProps } from "../types";

const createData = async (props: {
  data: IDisburseLoanProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/${props.data.id}/disburse`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    disbursedAt: props.data.disbursedAt,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useDisburseLoan = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IDisburseLoanProps) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
