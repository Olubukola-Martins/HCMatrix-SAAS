import axios from "axios";
import { useMutation } from "react-query";
import { ISaveEmergencyContactProps } from "../types";

// emergency contact
export const saveEmployeeEmergencyContact = async (
  props: ISaveEmergencyContactProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/emergency-contact`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes
  const data: any = {
    ...props,
  };

  delete data["companyId"];
  delete data["token"];
  delete data["id"];
  delete data["employeeId"];

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveEmployeeEmergencyContact = () => {
  return useMutation(saveEmployeeEmergencyContact);
};
