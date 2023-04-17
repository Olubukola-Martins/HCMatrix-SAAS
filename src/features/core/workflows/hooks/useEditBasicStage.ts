import { useMutation } from "react-query";
import { TBasicWorkflowStage } from "./useCreateBasicWorkflow";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";

type TEditProps = {
  workflowId: number;
  id: number;
  stage: TBasicWorkflowStage;
};

const editStage = async (props: TEditProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.workflowId}/stage/basic/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;
  // NOTE: ENSURE THE PREVIOUS ID IS SET TO NULL
  if (!props["stage"]["departmentHeadId"])
    data["stage"]["departmentHeadId"] = null;
  if (!props["stage"]["roleId"]) data["stage"]["roleId"] = null;
  if (!props["stage"]["employeeId"]) data["stage"]["employeeId"] = null;
  if (!props["stage"]["groupId"]) data["stage"]["groupId"] = null;
  delete props["stage"]["id"];
  delete props["stage"]["departmentHeadId"]; //until when needed

  const ans = {
    ...props["stage"],
  };

  const response = await axios.put(url, ans, config);
  return response;
};
export const useEditBasicStage = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TEditProps) =>
    editStage({ ...props, token, companyId })
  );
};

export default useEditBasicStage;
