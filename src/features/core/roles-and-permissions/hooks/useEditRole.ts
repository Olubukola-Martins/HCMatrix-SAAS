import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

interface IData {
  name: string;
  permissionIds: number[];
}
export const createRole = async (
  props: IData,
  roleId: number,
  auth: ICurrentCompany
) => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/permission/role/${roleId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const data = {
    name: props.name,
    permissionIds: props.permissionIds,
  };

  const response = await axios.put(url, data, config);
  return response;
};

export const useEditRole = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(({ roleId, data }: { roleId: number; data: IData }) =>
    createRole(data, roleId, { token, companyId })
  );
};
