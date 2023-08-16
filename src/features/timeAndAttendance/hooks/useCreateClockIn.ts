import axios from "axios";
import { useMutation } from "react-query";
import { IClockInPolicy } from "../types/settings";

export const createClockInPolicy = async (props: IClockInPolicy) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    // name: props.name,
    // email: props.email,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateDepartment = () => {
  return useMutation(createClockInPolicy);
};
