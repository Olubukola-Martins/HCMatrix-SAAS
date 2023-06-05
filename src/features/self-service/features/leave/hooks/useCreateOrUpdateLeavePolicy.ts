import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";

type TCreateProps = {
  defaultLength: number;
  workflowId: number;
  includeWeekends: boolean;
  includeHolidays: boolean;
  carryover: boolean;
  maxLengthCarryover: number;
  casualLeave: boolean;
  casualLeaveLength: number;
  probationersApply: boolean;
  probationersUseCasualLeave: boolean;
};

const createOrUpdateLeavePolicy = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/policy-setting`;
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
export const useCreateOrUpdateLeavePolicy = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createOrUpdateLeavePolicy({ data: props, auth: { token, companyId } })
  );
};
