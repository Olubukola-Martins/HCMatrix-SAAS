import axios from "axios";
import { useMutation } from "react-query";
import { ICreateBranchProps } from "./useCreateBranch";

export interface IUpdateBranchProps extends ICreateBranchProps {
  id: number;
}
export const updateBranch = async (props: IUpdateBranchProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch/${props.id}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = props;

  delete data["companyId"];
  delete data["token"];
  delete data["id"];

  const response = await axios.put(url, data, config);
  return response;
};

export const useUpdateBranch = () => {
  return useMutation(updateBranch);
};
