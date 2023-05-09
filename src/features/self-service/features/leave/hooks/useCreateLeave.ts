import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  employeeId: number;
  departmentId: number;
  startDate: string;
  endDate: string;
  length: number;
  leaveTypeId: number;
  reason: string;
  requestAllowance: boolean;
  workAssigneeId: number;
  documentUrls: string[];
};

const createLeave = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TCreateProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateLeave = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createLeave({ data: props, auth: { token, companyId } })
  );
};
