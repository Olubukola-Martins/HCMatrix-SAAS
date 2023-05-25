import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TRequistionType } from "../../types";

type TCreateProps = {
  type: TRequistionType;
  body: {
    workflowId: number;
    isActive: boolean;
  };
};

const saveData = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/requisition/setting/${props.data.type}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data = props.data.body;

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateOrUpdateRequisitionSetting = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    saveData({ data: props, auth: { token, companyId } })
  );
};
