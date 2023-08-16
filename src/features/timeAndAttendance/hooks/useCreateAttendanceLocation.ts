import axios from "axios";
import { useMutation } from "react-query";
import { IBiometricDeviceLocation } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createAttendanceLocation = async (
  props: IBiometricDeviceLocation
) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/create-biometric-device-location`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const data: any = {
    biometricDeviceLocations: props.biometricDeviceLocations,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateAttendanceLocation = () => {
  return useMutation(createAttendanceLocation);
};
