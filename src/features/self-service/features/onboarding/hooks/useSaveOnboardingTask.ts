import axios from "axios";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export interface ICreateProps extends ICurrentCompany {
  name: string;
  description: string;
  priority: "high" | "low" | "medium";
  supervisorId: number;
  startDate: string;
  endDate: string;
  id: number;
}
const saveOnboardingTask = async (props: ICreateProps) => {
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/onboarding/${props.id}/task`;
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
export const useSaveOnboardingTask = () => {
  return useMutation(saveOnboardingTask);
};

export default useSaveOnboardingTask;
