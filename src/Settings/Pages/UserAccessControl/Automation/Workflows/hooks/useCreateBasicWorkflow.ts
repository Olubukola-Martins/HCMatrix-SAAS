import {
  ICurrentCompany,
  TEmployee,
  TGroup,
  TRole,
} from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

export type TBasicWorkflowStage = {
  name: string;
  roleId?: number;
  employeeId?: number;
  groupId?: number;
};
type TCreateProps = {
  name: string;
  stages: TBasicWorkflowStage[];
};

export type TBasicWorkflow = {
  id: number;
  role?: TRole;
  group?: TGroup;
  employee?: TEmployee;
} & TCreateProps;

const createWorkflow = async (props: TCreateProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/basic`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;

  delete data["companyId"];
  delete data["token"];
  delete data["id"];

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateBasicWorkflow = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createWorkflow({ ...props, token, companyId })
  );
};

export default useCreateBasicWorkflow;
