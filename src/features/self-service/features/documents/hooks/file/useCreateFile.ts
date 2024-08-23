import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TFileData = {
  url: string;
  name: string;
  description: string;
  access: Access[];
};

type  Access  = {
  groupId: number
} | {
  departmentId: number
}| {
  roleId: number
} | {
  employeeId: number
}

const createData = async (props: {
  data: TFileData;
  folderId: number;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/document/folder/${props.folderId}/file`;
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

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateFile = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    ({ data, folderId }: { data: TFileData; folderId: number }) =>
      createData({ data, folderId, auth: { token, companyId } })
  );
};
