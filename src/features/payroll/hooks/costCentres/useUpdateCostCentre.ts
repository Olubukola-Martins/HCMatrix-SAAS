import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TSaveCostCentreResponse } from "features/payroll/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";

type TCostData = {
  id: number;
  body: {
    //as per patch so all params are optional
    name?: string;
    amountEntered?: number;
  };
};
const createData = async (props: {
  data: TCostData;
  auth: ICurrentCompany;
}): Promise<TSaveCostCentreResponse> => {
  const url = `${MICROSERVICE_ENDPOINTS.PAYROLL}/cost-centre/${props.data.id}`;
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
  const item: TSaveCostCentreResponse = response.data;
  return item;
};
export const useUpdateCostCentre = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCostData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
