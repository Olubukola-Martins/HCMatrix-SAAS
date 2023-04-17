import axios from "axios";
import { useMutation } from "react-query";
import { IAddMemberToGroupProps } from "../types";

export const addMemberToGroup = async (props: IAddMemberToGroupProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.id}/management`;

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

  const response = await axios.post(url, data, config);
  return response;
};

export const useAddMemberToGroup = () => {
  return useMutation(addMemberToGroup);
};
