import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TFileData = {
  url: string;
  name: string;
  description: string;
};

const createData = async (props: {
  data: TFileData;
  folderId: number;
  fileId: number;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder/${props.folderId}/file/${props.fileId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TFileData = {
    ...props.data,
  };

  const response = await axios.patch(url, data, config);
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
      data: TFileData;
      folderId: number;
      fileId: number;
    }) => createData({ data, folderId, fileId, auth: { token, companyId } })
  );
};
