import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { TLeaveType } from "../../types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_LEAVE_TYPES } from "./useGetLeaveTypes";

export type TCreateLeaveTypeProps = Pick<
  TLeaveType,
  | "name"
  | "length"
  | "employeesGetAllowance"
  | "gender"
  | "applicableToCertainGroup"
  | "groupId"
  | "maritalStatus"
  | "employeeStatus"
  | "requireReliever"
>;

const createLeaveType = async (props: {
  data: TCreateLeaveTypeProps;
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

  const data: TCreateLeaveTypeProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useCreateLeaveType = () => {
  const queryClient = useQueryClient();

  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: TCreateLeaveTypeProps) =>
      createLeaveType({ data: props, auth: { token, companyId } }),
    {
      onSuccess: (res, variables, context) => {
        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_LEAVE_TYPES],
          // exact: true,
        });
      },
      onError: (err: any, variables, context) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response?.data.message ?? err?.response?.data.error.message,
        });
      },
    }
  );
};
