import axios from "axios";
import { useMutation } from "react-query";
import { ITimeOffPolicyRule } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createTimeOffPolicy = async (props: ITimeOffPolicyRule) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off/policy`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    timeOffPolicies: props.timeOffPolicies,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateTimeOffPolicy = () => {
  return useMutation(createTimeOffPolicy);
};
