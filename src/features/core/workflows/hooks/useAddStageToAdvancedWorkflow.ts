import { useMutation } from "react-query";
import { TBasicWorkflowStage } from "./useCreateBasicWorkflow";
import axios from "axios";
import { TEmployee } from "features/core/employees/types";
import { TGroup } from "features/core/groups/types";
import { TRole } from "features/core/roles-and-permissions/types";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";

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
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.id}/stage/advanced`;
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
export const useAddStageToAdvancedWorkflow = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    addStage({ ...props, token, companyId })
  );
};

export default useAddStageToAdvancedWorkflow;
