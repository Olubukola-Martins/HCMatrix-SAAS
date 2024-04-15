import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { scheduleEmployeesShiftProps } from "../types";

export const createData = async (props: {
  data: scheduleEmployeesShiftProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/employees/manual-assign`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    employeeIds: props.data.id
      ? [props.data.employeeIds]
      : props.data.employeeIds,
    shiftType: props.data.shiftType,
    startDate: props.data.startDate,
    endDate: props.data.endDate,
    isPermanent: props.data.isPermanent,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useAddEmployeeShift = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: scheduleEmployeesShiftProps }) =>
    createData({ data: props.data, auth: { companyId, token } })
  );
};
