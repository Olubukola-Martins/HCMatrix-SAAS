import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { openNotification } from "utils/notifications";
import { TLeaveCycle } from "../../types/leaveCycle";
import { QUERY_KEY_FOR_LEAVE_CYCLE } from "./useGetLeaveCycle";

export type TSaveLeaveCycleProps = Pick<
  TLeaveCycle,
  "startDay" | "startMonth" | "endDay" | "endMonth"
>;

const saveLeaveCycle = async (props: {
  data: TSaveLeaveCycleProps;
  auth: ICurrentCompany;
}) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/cycle`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const data: TSaveLeaveCycleProps = {
    ...props.data,
  };

  const response = await axios.post(url, data, config);
  return response;
};
export const useSaveLeaveCycle = () => {
  const queryClient = useQueryClient();

  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: TSaveLeaveCycleProps) =>
      saveLeaveCycle({ data: props, auth: { token, companyId } }),
    {
      onSuccess: (res, variables, context) => {
        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_LEAVE_CYCLE],
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
