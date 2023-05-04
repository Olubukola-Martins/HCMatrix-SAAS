import { useMutation } from "react-query";
import { IDelEmpEmploymentHistoryProps } from "../types";
import axios from "axios";

export const deleteEmployeeEmploymentHistory = async (
  props: IDelEmpEmploymentHistoryProps
) => {
  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/${props.employeeId}/employment-history/${props.historyId}`;

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
export const useDeleteEmployeeEmploymentHistory = () => {
  return useMutation(deleteEmployeeEmploymentHistory);
};
