import axios from "axios";
import { useMutation } from "react-query";
import { IAllTimeOff } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createData = async (props: IAllTimeOff) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/time-off/request`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    companyId: props.companyId,
    userId: props.userId,
    timeOffPolicyId: props.timeOffPolicyId,
    date: props.date,
    reason: props.reason,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateTimeOff = () => {
  return useMutation(createData);
};
