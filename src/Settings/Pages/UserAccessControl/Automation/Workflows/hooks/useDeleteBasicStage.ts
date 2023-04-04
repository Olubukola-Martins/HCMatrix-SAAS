import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";

import { useApiAuth } from "Hooks/useApiAuth";
import { useMutation } from "react-query";

type TDelProps = {
  workflowId: number;
  id: number;
};

const editStage = async (props: TDelProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.workflowId}/stage/basic/${props.id}`;
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
export const useDeleteBasicStage = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelProps) =>
    editStage({ ...props, token, companyId })
  );
};

export default useDeleteBasicStage;
