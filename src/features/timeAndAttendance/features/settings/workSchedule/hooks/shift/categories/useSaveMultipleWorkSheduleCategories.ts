import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkSheduleShiftCategory } from "../../../types";
type TData = {
  id?: number;
  name: string;
}[];
const createData = async (props: {
  data: TData;
  auth: ICurrentCompany;
}): Promise<TWorkSheduleShiftCategory[]> => {
  const { data, auth } = props;

  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/categories/multiple`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.patch(url, data, config);
  const fetchedData: TWorkSheduleShiftCategory[] = res.data.data;
  return fetchedData;
};

export const useSaveMultipleWorkSheduleCategories = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((data: TData) =>
    createData({ data, auth: { token, companyId } })
  );
};
