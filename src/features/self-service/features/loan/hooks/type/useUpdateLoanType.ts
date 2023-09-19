import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";
import { TLoanType } from "../../types";

type TCostData = {
  id: number;
  body: Partial<Pick<TLoanType, "name">>;
};
const createData = async (props: {
  data: TCostData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/loan/type/${props.data.id}`;
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

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateLoanType = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCostData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
