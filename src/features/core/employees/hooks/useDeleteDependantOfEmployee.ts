import axios from "axios";
import { useMutation } from "react-query";
import { IDeleteDependantOfEmployeeProps } from "../types";

export const deleteDependantOfEmployee = async (
  props: IDeleteDependantOfEmployeeProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/dependent/${props.dependantId}`;

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

  const response = await axios.delete(url, config);
  return response;
};
export const useDeleteDependantOfEmployee = () => {
  return useMutation(deleteDependantOfEmployee);
};
