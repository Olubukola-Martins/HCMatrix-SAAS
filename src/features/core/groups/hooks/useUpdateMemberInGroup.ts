import axios from "axios";
import { useMutation } from "react-query";
import { IUpdateMemberToGroupProps } from "../types";

export const updateMemberInGroup = async (props: IUpdateMemberToGroupProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${props.id}/management/${props.managementId}`;

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
  delete data["managementId"];
  delete data["id"];

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateMemberInGroup = () => {
  return useMutation(updateMemberInGroup);
};
