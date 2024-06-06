import axios from "axios";
import { useMutation } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { softClockOutProps } from "../types";

export const createData = async (props: {
  data: softClockOutProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/attendance/soft-clock-out`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: any = {
    comment: props.data.comment,
    endWork: props.data.endWork,
    extraHours: props.data.extraHours,
    payExtraHours: props.data.payExtraHours,
    location: {
        longitude: props.data.location.longitude?.toString(),
        latitude: props.data.location.latitude?.toString(),
    },
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useSoftClockOut = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: softClockOutProps) =>
    createData({ data: props, auth: { companyId, token } })
  );
};
