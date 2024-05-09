import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

interface TAccessData {
  type: string; //TO DO:  define the types properly => 'role' | 'department' |  ....
  entityId: number;
}
const createData = async (props: {
  data: TAccessData;
  folderId: number;
  fileId: number;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder/${props.folderId}/file/${props.fileId}/access`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TAccessData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
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
      data: TAccessData;
      folderId: number;
      fileId: number;
    }) => createData({ data, folderId, fileId, auth: { token, companyId } })
  );
};
