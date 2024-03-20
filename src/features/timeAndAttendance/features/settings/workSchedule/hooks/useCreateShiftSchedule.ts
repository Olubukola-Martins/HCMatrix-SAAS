import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { workScheduleShiftProps } from "../types";

export const createData = async (props: {
  data: workScheduleShiftProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.post(url, props.data, config);
  return response;
};

export const useCreateShiftSchedule = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: workScheduleShiftProps }) =>
    createData({ data: props.data, auth: { companyId, token } })
  );
};
