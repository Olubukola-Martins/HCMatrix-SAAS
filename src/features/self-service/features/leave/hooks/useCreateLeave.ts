import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TLeave } from "../types";

export type TCreateLeaveProps = Pick<
  TLeave,
  | "startDate"
  | "endDate"
  | "length"
  | "leaveTypeId"
  | "reason"
  | "relieverId"
  | "documentUrls"
  | "specificDates"
> & { employeeId?: number };

const createLeave = async (props: {
  data: TCreateLeaveProps;
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

  const data: TCreateLeaveProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateLeave = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateLeaveProps) =>
    createLeave({ data: props, auth: { token, companyId } })
  );
};
