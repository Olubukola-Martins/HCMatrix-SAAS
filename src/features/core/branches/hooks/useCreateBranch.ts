import axios from "axios";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export interface ICreateBranchProps extends ICurrentCompany {
  name: string;
  description: string;
  address: {
    streetAddress: string;
    countryId: number;
    stateId: number;
    lgaId: number;
    timezone: string;
  };
}
export const createBranch = async (props: ICreateBranchProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch`;
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

export const useCreateBranch = () => {
  return useMutation(createBranch);
};
