import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { filterReportProps, shiftPerEmployeeProps } from "../types";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_EMPLOYEE_PER_SHIFT = "EmployeePerShift";

export const getEmployeePerShift = async (props: {
  auth: ICurrentCompany;
  pagination?: IPaginationProps;
  filter?: filterReportProps;
}): Promise<{ data: shiftPerEmployeeProps[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/reports/employees-per-shift`;
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
      shiftTypes: props.filter?.shiftTypes,
      startDate: props.filter?.startDate,
      endDate: props.filter?.endDate,
      empUid: props.filter?.employeeId,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data.result;

  const result = fetchedData;

  const data: shiftPerEmployeeProps[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetEmployeePerShift = ({
  pagination,
  filter,
}: {
  pagination?: IPaginationProps;
  filter?: filterReportProps;
} = {}) => {
  const { companyId, token } = useApiAuth();
  const { departmentId, employeeId, endDate, shiftTypes, startDate } =
    filter ?? {};
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_EMPLOYEE_PER_SHIFT,
      pagination,
      departmentId,
      employeeId,
      endDate,
      shiftTypes,
      startDate,
    ],
    () =>
    getEmployeePerShift({
        auth: { token, companyId },
        pagination,
        filter: { departmentId, employeeId, endDate, shiftTypes, startDate },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
