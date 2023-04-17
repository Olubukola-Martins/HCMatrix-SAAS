import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TEditProps = {
  name: string;
  id: number;
};

const editWorkflow = async (props: TEditProps & ICurrentCompany) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/workflow/${props.id}`;
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

  const response = await axios.patch(url, data, config);
  return response;
};
export const useEditBasicWorkflow = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TEditProps) =>
    editWorkflow({ ...props, token, companyId })
  );
};

export default useEditBasicWorkflow;
