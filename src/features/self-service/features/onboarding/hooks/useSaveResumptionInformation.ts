import axios from "axios";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

// TO DO => create a hook that returns token, currentCompanyId, and user info (if needed or should be done from api)
// TO DO => Let there be no need to pass company id and token should be just what is ecpected by api

export interface ICreateProps extends ICurrentCompany {
  branchId: number;
  resumptionDateAndTime: string;
  whoToCallId: number;
  documentUrl: string;
  id: number;
}
const saveResumptionInformation = async (props: ICreateProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/onboarding/${props.id}/resumption-information`;
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

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveResumptionInformation = () => {
  return useMutation(saveResumptionInformation);
};

export default useSaveResumptionInformation;
