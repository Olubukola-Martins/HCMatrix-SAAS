import axios from "axios";
import { useMutation } from "react-query";
import { IClockInPolicy } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createClockInPolicy = async (props: IClockInPolicy) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/create-clock-in-policy`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

   // Map the biometricDevices array and stringify the serialNumber
   const biometricDevicesWithSerializedSerialNumber = props.biometricDevices.map((device) => ({
    ...device,
    serialNumber: JSON.stringify(device.serialNumber),
  }));

  const data: any = {
    companyId: props.companyId,
    isSoftClockIn: props.isSoftClockIn,
    isBiometricClockIn: props.isBiometricClockIn,
    adminId: props.adminId,
    biometricDevices: biometricDevicesWithSerializedSerialNumber,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateClockIn = () => {
  return useMutation(createClockInPolicy);
};
