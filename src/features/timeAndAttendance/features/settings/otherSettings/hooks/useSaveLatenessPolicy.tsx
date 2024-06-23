import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TLatenessPolicy } from "../types";
import { QUERY_KEY_FOR_LATENESS_POLICY } from "./useGetLatenessPolicy";
import { openNotification } from "utils/notifications";

export type TSaveLatenessPolicyData = {
  sendNotification: boolean;
  sendReport: boolean;
  reportFrequency: TLatenessPolicy["reportFrequency"];
  reportToRoleId: number;

  gracePeriod: TLatenessPolicy["gracePeriod"]; // Any of: '0 minutes', '10 minutes', '20 minutes', '30 minutes'
};

type ApiResponse<T> = {
  message: string;
  data: T;
};

const createData = async (props: {
  data: TSaveLatenessPolicyData;
  auth: ICurrentCompany;
}): Promise<ApiResponse<TLatenessPolicy>> => {
  const { data, auth } = props;

  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/lateness-policy`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.put(url, data, config);
  const fetchedData: ApiResponse<TLatenessPolicy> = res.data;
  return fetchedData;
};

export const useSaveLatenessPolicy = ({
  onClose,
}: {
  onClose?: () => void;
} = {}) => {
  const { token, companyId } = useApiAuth();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((data: TSaveLatenessPolicyData) =>
    createData({ data, auth: { token, companyId } })
  );
  const handleSubmit = (data: TSaveLatenessPolicyData) =>
    mutate(data, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res) => {
        openNotification({
          state: "success",
          title: "Success",
          description: res?.message,
          // duration: 0.4,
        });

        onClose?.();
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_LATENESS_POLICY],
          // exact: true,
        });
      },
    });
  return { isLoading, handleSubmit };
};
