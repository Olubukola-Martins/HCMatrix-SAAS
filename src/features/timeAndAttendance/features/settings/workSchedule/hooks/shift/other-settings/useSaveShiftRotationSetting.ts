import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation, useQueryClient } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkSheduleShiftRotationSetting } from "../../../types";
import { openNotification } from "utils/notifications";
import { QUERY_KEY_WORK_SCHEDULE_ROTATION_SETTING } from "./useGetShiftRotationSetting";

export type TSaveShiftRotationSettingData = {
  enableRotation: boolean;
  rotationFrequency: number;
  rotationFrequencyUnit: TWorkSheduleShiftRotationSetting["rotationFrequencyUnit"];
  pattern: Pattern[];
};

interface Pattern {
  shiftFromId: number | null;
  shiftToId: number | null;
}
const createData = async (props: {
  data: TSaveShiftRotationSettingData;
  auth: ICurrentCompany;
}): Promise<TWorkSheduleShiftRotationSetting> => {
  const { data, auth } = props;

  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/other-settings/rotation`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const dataTweaked: TSaveShiftRotationSettingData = {
    ...data,
    rotationFrequencyUnit: "days", // Done because this does not change from the ui, so its simply hardcoded
  };

  const res = await axios.put(url, dataTweaked, config);
  const fetchedData: TWorkSheduleShiftRotationSetting = res.data.data;
  return fetchedData;
};

export const useSaveShiftRotationSetting = ({
  onClose,
}: {
  onClose?: () => void;
} = {}) => {
  const { token, companyId } = useApiAuth();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (data: TSaveShiftRotationSettingData) =>
      createData({ data, auth: { token, companyId } })
  );
  const handleSubmit = (data: TSaveShiftRotationSettingData) =>
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
          description: "Rotation Pattern Updated Successfully",
          // duration: 0.4,
        });

        onClose?.();
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY_WORK_SCHEDULE_ROTATION_SETTING],
          // exact: true,
        });
      },
    });
  return { isLoading, handleSubmit };
};
