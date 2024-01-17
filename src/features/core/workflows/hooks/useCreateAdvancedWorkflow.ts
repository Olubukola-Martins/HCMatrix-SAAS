import axios from "axios";
import { TEmployee } from "features/core/employees/types";
import { TGroup } from "features/core/groups/types";
import { TRole } from "features/core/roles-and-permissions/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TStageCondition, TStagingType } from "../types";

export type TAdvancedWorkflowStage = {
  id?: number;
  name: string;
  type: TStagingType;
  entityId?: number;
  condition?: TStageCondition;
  count?: number;
  enableTwoFactorAuth?: boolean;
};
type TCreateProps = {
  name: string;
  advancedStages: TAdvancedWorkflowStage[];
};

export type TAdvancedWorkflow = {
  id: number;
  role?: TRole;
  group?: TGroup;
  employee?: TEmployee;
} & TCreateProps;

const createWorkflow = async (data: TCreateProps, auth: ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/advanced`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateAdvancedWorkflow = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createWorkflow({ ...props }, { companyId, token })
  );
};

export default useCreateAdvancedWorkflow;
