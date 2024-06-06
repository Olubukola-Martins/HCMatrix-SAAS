import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";

type TPayrollData = {
  id: number;
  body: {
    disbursementDate?: string;
  };
};
const createData = async (props: {
  data: TPayrollData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/payroll/${props.data.id}/run`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = {
    ...removeUndefinedProperties(props.data.body),
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useRunPayroll = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TPayrollData }) =>
    createData({
      data: props.data,
      auth: { token, companyId },
    })
  );
};
