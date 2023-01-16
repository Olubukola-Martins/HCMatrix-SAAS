import axios from "axios";
import { ICurrentCompany } from "../../AppTypes/DataEntitities";

export interface ICreateSisterCompProps extends ICurrentCompany {
  name: string;
  email: string;
  phoneNumber: string;
  industryId: number;
}
export const createSisterCompany = async (props: ICreateSisterCompProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/sister`;
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
    email: props.email,
    phoneNumber: props.phoneNumber,
    industryId: props.industryId,
  };
  const response = await axios.post(url, data, config);
  return response;
};
