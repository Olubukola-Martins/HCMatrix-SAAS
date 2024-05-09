import { useMutation } from "react-query";
import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { ICurrentCompany } from "types";
import { TAdvancedWorkflowStage } from "./useCreateAdvancedWorkflow";

type TEditProps = {
  workflowId: number;
  id: number;
  stage: TAdvancedWorkflowStage;
};

const editStage = async (data: TEditProps, auth: ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${data.workflowId}/stage/advanced/${data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const response = await axios.put(url, { ...data.stage }, config);
  return response;
};
export const useEditAdvancedStage = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TEditProps) =>
    editStage({ ...props }, { token, companyId })
  );
};

export default useEditAdvancedStage;
