import axios from "axios";
import { ICreateDegProps } from "../types";
import { useMutation } from "react-query";

export const createDesignation = async (props: ICreateDegProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation`;
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
    departmentId: props.departmentId,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateDesignation = () => {
  return useMutation(createDesignation);
};
