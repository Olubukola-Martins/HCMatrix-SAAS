import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export interface ICreateRoleProps {
  name: string;
  permissionIds: number[];
}
export const createRole = async (
  props: ICreateRoleProps,
  auth: ICurrentCompany
) => {
  const url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/permission/role`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = {
    name: props.name,
    permissionIds: props.permissionIds,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateRole = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: ICreateRoleProps) =>
    createRole(props, { token, companyId })
  );
};
