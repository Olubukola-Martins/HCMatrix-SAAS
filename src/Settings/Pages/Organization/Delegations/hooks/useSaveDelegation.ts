import { ICurrentCompany } from "AppTypes/DataEntitities";
import axios from "axios";
import { useMutation } from "react-query";

export interface ICreateProps extends ICurrentCompany {
  delegatorId: number;
  delegateeId: number;
  startDate: string;
  endDate: string;
  permissions: {
    permissionId: number;
  }[];
  description: string;
}
const saveDelegation = async (props: ICreateProps) => {
  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/delegation`;
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

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveDelegation = () => {
  return useMutation(saveDelegation);
};

export default useSaveDelegation;
