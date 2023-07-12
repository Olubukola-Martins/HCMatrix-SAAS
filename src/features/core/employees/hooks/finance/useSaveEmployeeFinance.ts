import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { Finance, TBankValue, TPensionValue, TWalletValue } from "../../types";

type TDataValue = Pick<Finance, "key" | "value">;
const createData = async (props: {
  employeeId: number;
  data: TDataValue;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}/finance/${props.data.key}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TBankValue | TPensionValue | TWalletValue = {
    ...props.data.value,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveEmployeeFinance = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: TDataValue; employeeId: number }) =>
    createData({ ...props, auth: { token, companyId } })
  );
};
