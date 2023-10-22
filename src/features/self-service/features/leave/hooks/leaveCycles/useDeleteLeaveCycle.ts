import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_FOR_LEAVE_ANALYTICS } from "../useGetLeaveAnalytics";

type TData = {
  id: number;
};
const delData = async (props: { data: TData; auth: ICurrentCompany }) => {
  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/task/${props.data.id}`;
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
export const useDeleteLeaveCycle = (
  onSuccess?: () => void,
  onError?: () => void
) => {
  const queryClient = useQueryClient();

  const { token, companyId } = useApiAuth();
  return useMutation(
    (props: TData) => delData({ data: props, auth: { token, companyId } }),
    {
      onSuccess: (res, variables, context) => {
        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_LEAVE_ANALYTICS], //Replace with proper query key
          // exact: true,
        });
        onSuccess?.();
      },
      onError: (err: any, variables, context) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response?.data.message ?? err?.response?.data.error.message,
        });
        onError?.();
      },
    }
  );
};
