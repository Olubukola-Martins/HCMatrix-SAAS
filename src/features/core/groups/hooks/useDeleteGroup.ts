import axios from "axios";
import { useMutation } from "react-query";
import { IGetSingleGroupProps } from "../types";

export const deleteSingleGroup = async (props: IGetSingleGroupProps) => {
  const id = props.id;

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group/${id}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDeleteGroup = () => {
  return useMutation(deleteSingleGroup);
};
