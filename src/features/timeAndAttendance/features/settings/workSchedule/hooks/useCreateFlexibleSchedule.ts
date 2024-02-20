import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { workScheduleFlexibleProps } from "../types";

export const createData = async (props: {
  data: workScheduleFlexibleProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/flexible`;
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

export const useCreateFlexibleSchedule = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: workScheduleFlexibleProps }) =>
  createData({ data: props.data, auth: { companyId, token } })
  );
};
