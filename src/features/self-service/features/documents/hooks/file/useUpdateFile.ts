import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TFileData } from "./useCreateFile";
import { TFormFileInput } from "types/files";
import { uploadFile } from "hooks/useUploadFile";

const createData = async (props: {
  data: TFileData & { file?: TFormFileInput };
  folderId: number;
  fileId: number;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/document/folder/${props.folderId}/file/${props.fileId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  // upload document url
  const fileUrl = props?.data?.file
    ? await uploadFile({
        auth: { companyId: props.auth.companyId, token: props.auth.token },
        data: { file: props.data.file },
      })
    : props.data.url;
  props.data.url = typeof fileUrl === "string" ? fileUrl : fileUrl.data;
  
  delete props.data.file;

  const data: TFileData = {
    ...props.data,
  };

  const response = await axios.put(url, data, config);
  return response;
};
export const useUpdateFile = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    ({
      data,
      folderId,
      fileId,
    }: {
      data: TFileData & { file?: TFormFileInput };
      folderId: number;
      fileId: number;
    }) => createData({ data, folderId, fileId, auth: { token, companyId } })
  );
};
