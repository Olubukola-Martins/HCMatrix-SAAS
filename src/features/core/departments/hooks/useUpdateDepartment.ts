import axios from "axios";
import { useMutation } from "react-query";
import { IUpdateDeptProps } from "../types";

export const updateDepartment = async (props: IUpdateDeptProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  if (!props.departmentHeadId) delete data["departmentHeadId"];
  if (!props.parentDepartmentId) delete data["parentDepartmentId"];

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateDepartment = () => {
  return useMutation(updateDepartment);
};
