import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TFolderData = {
  name: string;
};
const createData = async (props: {
  data: TFolderData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/folder`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TFolderData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateFolder = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TFolderData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
