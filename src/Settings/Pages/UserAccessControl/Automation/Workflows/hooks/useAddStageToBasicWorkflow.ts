import {
  ICurrentCompany,
  TEmployee,
  TGroup,
  TRole,
} from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";
import { TBasicWorkflowStage } from "./useCreateBasicWorkflow";

type TCreateProps = {
  id: number;
  stage: TBasicWorkflowStage;
};

export type TBasicWorkflow = {
  id: number;
  role?: TRole;
  group?: TGroup;
  employee?: TEmployee;
} & TCreateProps;

const addStage = async (props: TCreateProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.id}/stage/basic`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props.stage;

  delete data["companyId"];
  delete data["token"];
  delete data["id"];

  const response = await axios.post(url, data, config);
  return response;
};
export const useAddStageToBasicWorkflow = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    addStage({ ...props, token, companyId })
  );
};

export default useAddStageToBasicWorkflow;
