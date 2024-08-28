import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { IDisbursementProps } from "../../../types/setting";

export const createData = async (props: {
  data: IDisbursementProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/setting/disbursement`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateDisbursementSetUp = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: IDisbursementProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
