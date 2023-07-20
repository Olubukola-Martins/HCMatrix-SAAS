import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TSetupPayrollSchemeData } from "features/payroll/types/setUpSchemeInputData";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TSchemeData = Omit<TSetupPayrollSchemeData, "allowances" | "deductions">;

const createData = async (props: {
  data: TSchemeData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/scheme`;
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
  return useMutation((props: TSchemeData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
