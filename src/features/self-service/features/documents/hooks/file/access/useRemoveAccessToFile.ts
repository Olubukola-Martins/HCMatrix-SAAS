import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TRemAccessData = {
  fileId: number;
  folderId: number;
  accessId: number;
};
const delData = async (props: {
  data: TRemAccessData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder/${props.data.folderId}/file/${props.data.fileId}/access/${props.data.accessId}`;
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
export const useRemoveAccessToFile = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TRemAccessData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
