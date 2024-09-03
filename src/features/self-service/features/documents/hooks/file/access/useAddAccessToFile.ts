import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { Access } from "../useCreateFile";

const createData = async (props: {
  data: Access[];
  folderId: number;
  fileId: number;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/document/folder/${props.folderId}/file/${props.fileId}/access`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    access: props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useAddAccessToFile = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    ({
      data,
      folderId,
      fileId,
    }: {
      data: Access[];
      folderId: number;
      fileId: number;
    }) => createData({ data, folderId, fileId, auth: { token, companyId } })
  );
};
