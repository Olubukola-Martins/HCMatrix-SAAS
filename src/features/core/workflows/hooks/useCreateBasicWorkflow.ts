import axios from "axios";
import { TEmployee } from "features/core/employees/types";
import { TGroup } from "features/core/groups/types";
import { TRole } from "features/core/roles-and-permissions/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TBasicWorkflowStage = {
  id?: number;
  name: string;
  roleId?: number;
  employeeId?: number;
  groupId?: number;
  departmentHeadId?: number;
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
