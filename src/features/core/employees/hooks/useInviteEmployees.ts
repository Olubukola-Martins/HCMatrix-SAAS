import axios from "axios";
import { IEmpInviteProps } from "../types";
import { useMutation } from "react-query";

export const employeeInvite = async (props: IEmpInviteProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/invite`;
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    emails: props.emails.split(","),
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useInviteEmployees = () => {
  return useMutation(employeeInvite);
};
