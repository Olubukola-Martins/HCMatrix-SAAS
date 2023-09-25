import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDelData = {
  projectId: number;
};
const delData = async (props: { data: TDelData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/project/${props.data.projectId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useDeleteProject = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
