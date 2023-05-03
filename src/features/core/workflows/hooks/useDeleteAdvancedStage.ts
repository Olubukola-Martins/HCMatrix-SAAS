import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDelProps = {
  workflowId: number;
  id: number;
};

const deleteStage = async (props: TDelProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.workflowId}/stage/advanced/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useDeleteAdvancedStage = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelProps) =>
    deleteStage({ ...props, token, companyId })
  );
};

export default useDeleteAdvancedStage;
