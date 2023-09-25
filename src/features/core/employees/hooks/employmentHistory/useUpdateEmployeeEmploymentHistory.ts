import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  organization: string;
  position: string;
  startDate: string;
  endDate: string;
};
const createData = async (props: {
  employmentHistoryId: number;
  employeeId: number;
  data: TData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}/employment-history/${props.employmentHistoryId}`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TData = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useUpdateEmployeeEmploymentHistory = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: { data: TData; employeeId: number; employmentHistoryId: number }) =>
      createData({ ...props, auth: { token, companyId } })
  );
};
