import { TFetchListDataExtraProps, TFetchListDataProps } from "types";
import { TEmployee, TEmployeeStatus } from "../types";
import axios from "axios";

import { useQuery } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TLicenseType } from "features/authentication/types/auth-user";

export const QUERY_KEY_FOR_LIST_OF_EMPLOYEES = "employees";

export type TEmployeeFilterProps = {
  status?: TEmployeeStatus[];
  gender?: "male" | "female";
  roleId?: number;
  designationId?: number;
  departmentId?: number;
  branchId?: number;
  licenseType?: TLicenseType[];
};
export const getEmployees = async (
  props: TFetchListDataProps & TEmployeeFilterProps
): Promise<{
  data: Omit<
    TEmployee,
    | "personalInformation"
    | "userGroups"
    | "directReports"
    | "managerHistory"
    | "skills"
    | "emergencyContact"
    | "dependents"
    | "finance"
  >[];
  total: number;
}> => {
  const { pagination, roleId, departmentId, designationId, branchId, gender } =
    props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  let url = `${MICROSERVICE_ENDPOINTS.UTILITY}/employee`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
    },
    params: {
      roleId,
      departmentId,
      designationId,
      branchId,
      gender,
      status: props?.status?.join(","),
      licenseType: props?.licenseType?.join(","),
      search: props?.searchParams?.name,
      limit,
      offset,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TEmployee[] = result.map(
    (item: TEmployee): TEmployee => ({
      ...item,
      // No need as we adhere to same type as backend
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchEmployees = ({
  pagination,
  searchParams,
  onSuccess,
  status,
  roleId,
  departmentId,
  designationId,
  branchId,
  gender,
  licenseType,
}: TFetchListDataExtraProps &
  TEmployeeFilterProps & {
    onSuccess?: Function;
  } = {}) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [
      QUERY_KEY_FOR_LIST_OF_EMPLOYEES,
      pagination,
      status,
      searchParams?.name,
      roleId,
      departmentId,
      designationId,
      branchId,
      gender,
      licenseType,
    ],
    () =>
      getEmployees({
        companyId,
        token,
        pagination,
        searchParams,
        status,
        roleId,
        departmentId,
        designationId,
        branchId,
        gender,
        licenseType,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {},
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
