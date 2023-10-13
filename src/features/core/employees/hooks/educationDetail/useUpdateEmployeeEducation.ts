import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  school: string;
  degree: string;
  specialization: string;
  startDate: string;
  endDate: string;
};
const createData = async (props: {
  educationDetailId: number;
  employeeId: number;
  data: TData;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee/${props.employeeId}/education-detail/${props.educationDetailId}`;
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

  const response = await axios.patch(url, data, config);
  return response;
};
export const useUpdateEmployeeEducation = () => {
  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: { data: TData; employeeId: number; educationDetailId: number }) =>
      createData({ ...props, auth: { token, companyId } })
  );
};
