import axios from "axios";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export interface ICreateRoleProps extends ICurrentCompany {
  name: string;
  permissionIds: number[];
}
export const createRole = async (props: ICreateRoleProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/role`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    name: props.name,
    permissionIds: props.permissionIds,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateRole = () => {
  return useMutation(createRole);
};
