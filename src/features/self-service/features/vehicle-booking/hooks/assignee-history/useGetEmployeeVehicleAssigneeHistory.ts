import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";
import { TVehicleAssigneeHistory } from "../../types/vehicleAssigneeHistory";

interface IGetDataProps {
  pagination?: IPaginationProps;
}

export const QUERY_KEY_FOR_EMPLOYEE_VEHICLE_ASSIGNEE_HISTORY =
  "employee-vehicle-assignee-history";

export const getEmployeeVehicleAssigneeHistory = async (props: {
  data: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TVehicleAssigneeHistory[]; total: number }> => {
  const { pagination } = props.data;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/vehicle/assignee-history`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TVehicleAssigneeHistory[] = result.map(
    (item: TVehicleAssigneeHistory): TVehicleAssigneeHistory => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetEmployeeVehicleAssigneeHistory = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const { pagination } = props;
  const queryData = useQuery(
    [QUERY_KEY_FOR_EMPLOYEE_VEHICLE_ASSIGNEE_HISTORY, pagination],
    () =>
      getEmployeeVehicleAssigneeHistory({
        auth: { token, companyId },
        data: {
          ...props,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
