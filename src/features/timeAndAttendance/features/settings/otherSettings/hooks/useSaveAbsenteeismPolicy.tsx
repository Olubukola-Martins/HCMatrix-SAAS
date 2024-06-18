import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TAbsenteeismPolicy } from "../types";
import { QUERY_KEY_FOR_ABSENTEEISM_POLICY } from "./useGetAbsenteeismPolicy";
import { openNotification } from "utils/notifications";

export type TSaveAbsenteeismPolicyData = {
  markAbsent: boolean;
  sendNotification: boolean;
  sendReport: boolean;
  reportFrequency: TAbsenteeismPolicy["reportFrequency"];
  reportToRoleId: number;
};
const createData = async (props: {
  data: TSaveAbsenteeismPolicyData;
  auth: ICurrentCompany;
}): Promise<TAbsenteeismPolicy> => {
  const { data, auth } = props;

  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/absenteeism-policy`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.put(url, data, config);
  const fetchedData: TAbsenteeismPolicy = res.data.data;
  return fetchedData;
};

export const useSaveAbsenteeismPolicy = ({
  onClose,
}: {
  onClose?: () => void;
} = {}) => {
  const { token, companyId } = useApiAuth();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data: TSaveAbsenteeismPolicyData) =>
      createData({ data, auth: { token, companyId } })
  );
  const handleSubmit = (data: TSaveAbsenteeismPolicyData) =>
    mutate(data, {
      onError: (err: any) => {
        openNotification({
          state: "error",
          title: "Error Occurred",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
      onSuccess: (res: any) => {
        openNotification({
          state: "success",

          title: "Success",
          description: res.data.message,
          // duration: 0.4,
        });

        onClose?.();
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_FOR_ABSENTEEISM_POLICY],
          // exact: true,
        });
      },
    });
  return { isLoading, handleSubmit };
};
