import axios from "axios";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

export type TData = {
  data: {
    name: string;
    description: string;
    priority: "high" | "low" | "medium";
    supervisorId: number;
    startDate: string;
    endDate: string;
  };
  onboardingId: number;
};
const saveOnboardingTask = async (vals: {
  props: TData;
  auth: ICurrentCompany;
}) => {
  const { auth, props } = vals;
  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/self-service/onboarding/${props.onboardingId}/task`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data = props.data;

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveOnboardingTask = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    saveOnboardingTask({ props, auth: { token, companyId } })
  );
};

export default useSaveOnboardingTask;
