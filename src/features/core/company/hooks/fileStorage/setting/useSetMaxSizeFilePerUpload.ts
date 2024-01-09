import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { removeUndefinedProperties } from "utils/dataHelpers/removeUndefinedProperties";

type TData = Partial<{
  size: number;
  unit: "MB" | "KB" | "GB";
}>;
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/company/file-storage/setting`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...removeUndefinedProperties(props.data),
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useSetMaxSizeFilePerUpload = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
