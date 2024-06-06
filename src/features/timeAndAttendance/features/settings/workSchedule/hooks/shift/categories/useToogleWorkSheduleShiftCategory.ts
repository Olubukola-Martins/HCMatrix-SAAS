import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useMutation } from "react-query";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";
import { TWorkSheduleShiftCategory } from "../../../types";

const createData = async (props: {
  id: number;
  auth: ICurrentCompany;
}): Promise<TWorkSheduleShiftCategory> => {
  const { id, auth } = props;

  let url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/settings/work-schedules/shift/categories/${id}/toggle-enable`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
  };

  const res = await axios.patch(url, {}, config);
  const fetchedData: TWorkSheduleShiftCategory = res.data.data;
  return fetchedData;
};

export const useToogleWorkSheduleShiftCategory = () => {
  const { token, companyId } = useApiAuth();
  return useMutation((props: { id: number }) =>
    createData({ id: props.id, auth: { token, companyId } })
  );
};
