import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  onboardingIds: number[];
};
const createData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${
    MICROSERVICE_ENDPOINTS.UTILITY
  }/self-service/onboarding/${props.data.onboardingIds.join(",")}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.patch(url, data, config);
  return response;
};
export const useCompleteOnboardings = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    createData({ data: props, auth: { token, companyId } })
  );
};
