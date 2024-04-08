import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { multipleAttendanceProps } from "features/timeAndAttendance/features/timeSheet/types";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

const createData = async (props: {
  data: multipleAttendanceProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/employees/assign`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: multipleAttendanceProps = {
    ...props.data,
  };

  const response = await axios.postForm(url, data, config);
  return response;
};
export const useUploadMultipleEmployeeShift = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { data: multipleAttendanceProps }) =>
    createData({
      data: props.data,
      auth: { token, companyId },
    })
  );
};
