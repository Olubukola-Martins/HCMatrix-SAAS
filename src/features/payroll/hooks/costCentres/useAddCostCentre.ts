import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCostData = {
  name: string;
  amountEntered: number;
};
const createData = async (props: {
  data: TCostData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/cost-centre`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCostData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddCostCentre = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCostData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
