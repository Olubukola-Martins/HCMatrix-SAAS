import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkSheduleShiftSwapSetting } from "../../../types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_WORK_SCHEDULE_SWAP_SETTING } from "./useGetShiftSwapSetting";

export type TSaveShiftSwapSettingData = {
  enableShiftSwap: boolean;
  swapWorkflowId: number;
  swapEligibility: TWorkSheduleShiftSwapSetting["swapEligibility"];
};
const createData = async (props: {
  data: TSaveShiftSwapSettingData;
  auth: ICurrentCompany;
}): Promise<TWorkSheduleShiftSwapSetting> => {
  const { data, auth } = props;

  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/other-settings/swap`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.put(url, data, config);
  const fetchedData: TWorkSheduleShiftSwapSetting = res.data.data;
  return fetchedData;
};

export const useSaveShiftSwapSetting = ({
  onClose,
}: {
  onClose?: () => void;
} = {}) => {
  const { token, companyId } = useApiAuth();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation((data: TSaveShiftSwapSettingData) =>
    createData({ data, auth: { token, companyId } })
  );
  const handleSubmit = (data: TSaveShiftSwapSettingData) =>
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
          description: "Swap Eligibility Criteria Updated Successfully",
          // duration: 0.4,
        });

        onClose?.();
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_WORK_SCHEDULE_SWAP_SETTING],
          // exact: true,
        });
      },
    });
  return { isLoading, handleSubmit };
};
