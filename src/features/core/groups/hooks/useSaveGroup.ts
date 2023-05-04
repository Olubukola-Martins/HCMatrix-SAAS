import axios from "axios";
import { useMutation } from "react-query";
import { ISaveDataProps } from "../types";

export const saveGroup = async (props: ISaveDataProps) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group`;
  if (props.id) {
    url += `/${props.id}`;
  }
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
  if (props.id) {
    delete data["employees"];

    //update group
    const response = await axios.put(url, data, config);
    return response;
  }
  delete data["id"]; //create group
  const response = await axios.post(url, data, config);
  return response;
};

export const useSaveGroup = () => {
  return useMutation(saveGroup);
};
