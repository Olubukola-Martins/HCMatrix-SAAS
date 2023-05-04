import axios from "axios";
import { useMutation } from "react-query";
import { IUpdateDependantOfEmployeeProps } from "../types";

export const updateDependantOfEmployee = async (
  props: IUpdateDependantOfEmployeeProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/dependent/${props.id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  delete data["employeeId"];

  const response = await axios.patch(url, data, config);
  return response;
};

export const useUpdateDependantOfEmployee = () => {
  return useMutation(updateDependantOfEmployee);
};
