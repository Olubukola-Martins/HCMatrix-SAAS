import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TDelFileData = {
  fileId: number;
  folderId: number;
};
const delData = async (props: {
  data: TDelFileData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/document/folder/${props.data.folderId}/file/${props.data.fileId}`;
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
export const useDeleteFile = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TDelFileData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
