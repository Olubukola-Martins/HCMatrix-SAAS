import axios from "axios";
import { useMutation } from "react-query";
import { IOtherSettings } from "../types/settings";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";

export const createOtherSettings = async (props: IOtherSettings) => {
  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/company-policy`;
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
    longitude: props.longitude,
    latitude: props.latitude,
    isSoftClockinEnabled: props.isSoftClockinEnabled,
    geoFenceRadiusInKm: props.geoFenceRadiusInKm,
  };

  const response = await axios.post(url, data, config);
  return response;
};

export const useCreateOtherSettings = () => {
  return useMutation(createOtherSettings);
};
