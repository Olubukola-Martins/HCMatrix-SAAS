import axios from "axios";
import { useMutation } from "react-query";

import { ICreateDepProps } from "../types";

export const createDepartment = async (props: ICreateDepProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department`;
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
    email: props.email,
    departmentHeadId: props?.departmentHeadId,
    parentDepartmentId: props?.parentDepartmentId,
  };

  if (props.departmentHeadId) data.departmentHeadId = props.departmentHeadId;
  if (props.parentDepartmentId)
    data.parentDepartmentId = props.parentDepartmentId;

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateDepartment = () => {
  return useMutation(createDepartment);
};
