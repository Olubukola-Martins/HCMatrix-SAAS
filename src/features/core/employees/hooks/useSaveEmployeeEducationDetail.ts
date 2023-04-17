import axios from "axios";
import { useMutation } from "react-query";
import { ISaveEmpEducationDetailProps } from "../types";

export const saveEmployeeEducationDetail = async (
  props: ISaveEmpEducationDetailProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/education-detail`;
  if (props.detailId) {
    url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/education-detail/${props.detailId}`;
  }
  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  // necessary to make immediate changes when in  a central place when schema changes

  // made the data any so that the props that are not needed can be deleted
  const data: any = {
    ...props,
  };
  // delete the props that are not needed as the will result in an error
  delete data["token"]; //not needed
  delete data["companyId"]; //not needed
  delete data["employeeId"]; //not needed
  if (props.detailId) {
    delete data["detailId"];

    const response = await axios.patch(url, data, config);
    return response;
  } else {
    const response = await axios.post(url, data, config);
    return response;
  }
};
export const useSaveEmployeeEducationDetail = () => {
  return useMutation(saveEmployeeEducationDetail);
};
