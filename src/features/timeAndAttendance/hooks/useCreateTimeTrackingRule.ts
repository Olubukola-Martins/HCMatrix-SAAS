import axios from "axios";
import { useMutation } from "react-query";
import { ITimeTrackingRule } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createTimeTrackingRule = async (props: ITimeTrackingRule) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-tracking/policy`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    adminId: props.adminId,
    policy: props.policy,
    companyId: props.companyId,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateTimeTrackingRule = () => {
  return useMutation(createTimeTrackingRule);
};
