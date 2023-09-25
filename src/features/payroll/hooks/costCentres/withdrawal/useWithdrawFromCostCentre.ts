import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCostData = {
  amount: number;
};
const createData = async (props: {
  costCentreId: number;
  data: TCostData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/cost-centre/${props.costCentreId}/withdrawal`;
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
export const useWithdrawFromCostCentre = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((values: { props: TCostData; costCentreId: number }) => {
    const { props, costCentreId } = values;
    return createData({
      data: props,
      auth: { token, companyId },
      costCentreId,
    });
  });
};
