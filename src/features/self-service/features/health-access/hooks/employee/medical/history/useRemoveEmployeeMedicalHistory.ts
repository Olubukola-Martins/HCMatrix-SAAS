import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { TEmployeeMedicalHistoryType } from "features/self-service/features/health-access/types/employee";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TData = {
  employeeId: number;
  type: TEmployeeMedicalHistoryType;
  medicalHistoryId: number;
};
const delData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/health-access/employee/${props.data.employeeId}/medical/history/${props.data.type}/${props.data.medicalHistoryId}`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const response = await axios.delete(url, config);
  return response;
};
export const useRemoveEmployeeMedicalHistory = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TData) =>
    delData({ data: props, auth: { token, companyId } })
  );
};
