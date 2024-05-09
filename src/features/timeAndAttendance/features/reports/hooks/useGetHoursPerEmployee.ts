import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { filterReportProps, shiftPerEmployeeProps } from "../types";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_HOURS_PER_EMPLOYEE = "HoursPerEmployee";

export const getHoursPerEmployee = async (props: {
  auth: ICurrentCompany;
  pagination?: IPaginationProps;
  filter?: filterReportProps;
}): Promise<{ data: shiftPerEmployeeProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/reports/hours-per-employee`;
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.auth.token}`,
      "x-company-id": props.auth.companyId,
    },
    params: {
      limit,
      offset,
      departmentId: props.filter?.departmentId,
      startDate: props.filter?.startDate,
      endDate: props.filter?.endDate,
      empUid: props.filter?.employeeId,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data;

  const result = fetchedData;

  const data: shiftPerEmployeeProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetHoursPerEmployee = ({
  pagination,
  filter,
}: {
  pagination?: IPaginationProps;
  filter?: filterReportProps;
} = {}) => {
  const { companyId, token } = useApiAuth();
  const { departmentId, employeeId, endDate, startDate } = filter ?? {};
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_HOURS_PER_EMPLOYEE,
      pagination,
      departmentId,
      employeeId,
      endDate,
      startDate,
    ],
    () =>
    getHoursPerEmployee({
        auth: { token, companyId },
        pagination,
        filter: { departmentId, employeeId, endDate, startDate },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
