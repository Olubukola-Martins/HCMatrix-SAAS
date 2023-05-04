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

const editStage = async (data: TEditProps, auth: ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${data.workflowId}/stage/basic/${data.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const response = await axios.put(url, {...data.stage}, config);
  return response;
};
export const useEditBasicStage = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TEditProps) =>
    editStage({ ...props }, { token, companyId })
  );
};

export default useEditBasicStage;
