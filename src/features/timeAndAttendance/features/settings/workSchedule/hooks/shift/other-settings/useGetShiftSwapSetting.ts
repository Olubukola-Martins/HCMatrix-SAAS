import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkSheduleShiftSwapSetting } from "../../../types";

export const QUERY_KEY_WORK_SCHEDULE_SWAP_SETTING =
  "work-schedule-shift-swap-setting";

const getData = async (props: {
  auth: ICurrentCompany;
}): Promise<TWorkSheduleShiftSwapSetting> => {
  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/other-settings/swap`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
  };

  const res = await axios.get(url, config);
  const ans: TWorkSheduleShiftSwapSetting = res.data.data;

  return ans;
};

export const useGetShiftSwapSetting = () => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery([QUERY_KEY_WORK_SCHEDULE_SWAP_SETTING], () =>
    getData({
      auth: { token, companyId },
    })
  );

  return queryData;
};
