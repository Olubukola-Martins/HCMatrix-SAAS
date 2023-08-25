import axios from "axios";
import { useMutation } from "react-query";
import { workScheduleProps } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createWorkSchedule = async (props: workScheduleProps) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/work-schedule/policy`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    companyId: props.companyId,
    adminId: props.adminId,
    workArrangement: props.workArrangement,
    workDaysAndTime: props.workDaysAndTime,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateWorkSchedule = () => {
  return useMutation(createWorkSchedule);
};
