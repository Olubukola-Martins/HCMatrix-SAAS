import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkSheduleShiftRotationSetting } from "../../../types";
type TData = {
  enableShiftSwap: boolean;
  swapWorkflowId: number;
  swapEligibility: string;
};
const createData = async (props: {
  data: TData;
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

  const res = await axios.put(url, data, config);
  const fetchedData: TWorkSheduleShiftRotationSetting = res.data.data;
  return fetchedData;
};

export const useSaveShiftRotationSetting = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((data: TData) =>
    createData({ data, auth: { token, companyId } })
  );
};
