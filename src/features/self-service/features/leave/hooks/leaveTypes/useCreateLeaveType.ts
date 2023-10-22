import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { TLeaveType } from "../../types";

type TCreateProps = Pick<
  TLeaveType,
  | "name"
  | "length"
  | "calculation"
  | "employeesGetAllowance"
  | "gender"
  | "percentageAmount"
>;

const createLeaveType = async (props: {
  data: TCreateProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/type`;
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
export const useCreateLeaveType = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: TCreateProps) =>
    createLeaveType({ data: props, auth: { token, companyId } })
  );
};
