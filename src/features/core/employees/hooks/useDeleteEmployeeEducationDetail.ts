import { useMutation } from "react-query";
import { IDelEmpEducationDetailProps } from "../types";
import axios from "axios";

export const deleteEmployeeEducationDetail = async (
  props: IDelEmpEducationDetailProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/education-detail/${props.detailId}`;

  const config = {
    headers: {
      // Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};

export const useDeleteEmployeeEducationDetail = () => {
  return useMutation(deleteEmployeeEducationDetail);
};
