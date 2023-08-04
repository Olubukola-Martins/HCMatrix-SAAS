import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TSetupPayrollSchemeData } from "features/payroll/types/setUpSchemeInputData";

import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

const createData = async (props: {
  data: TSetupPayrollSchemeData;
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

  const data: TSetupPayrollSchemeData = {
    ...props.data,
    salaryComponents: props.data.salaryComponents.map((item) => ({
      type: item.type,
      name: item.name,
      label: item.label,
      mode: item.mode,
      isDefault: item.isDefault,
      amount: item.amount,
    })),
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSetupPayrollScheme = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TSetupPayrollSchemeData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
