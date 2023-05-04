import axios from "axios";
import { ICreateEmpBankProps } from "../types";
import { useMutation } from "react-query";

export const createEmployeeBank = async (props: ICreateEmpBankProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/finance/bank`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateEmployeeBank = () => {
  return useMutation(createEmployeeBank);
};
