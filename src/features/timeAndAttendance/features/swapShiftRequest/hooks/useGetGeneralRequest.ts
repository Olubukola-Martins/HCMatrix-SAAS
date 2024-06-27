import axios from "axios";
import { useQuery } from "react-query";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useApiAuth } from "hooks/useApiAuth";
import { IGeneralRequestFilter, TShiftSwapRequest } from "../types";
import { ICurrentCompany, IPaginationProps } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_GENERAL_SHIFT_SWAP_APPROVAL =
  "GeneralShiftSwapApproval";

export const getEmployeePerShift = async (props: {
  auth: ICurrentCompany;
  pagination?: IPaginationProps;
  filter?: IGeneralRequestFilter;
}): Promise<{ data: TShiftSwapRequest[]; total: number }> => {
  const limit = props.pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = props.pagination?.offset ?? 0;

  const url = `${MICROSERVICE_ENDPOINTS.TIME_AND_ATTENDANCE}/shift-swap`;
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
      status: props.filter?.status,
      employeeId: props.filter?.employeeId,
    },
  };

  const res = await axios.get(url, config);

  const fetchedData = res.data.data.result;

  const result = fetchedData;

  const data: TShiftSwapRequest[] = result;

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
export const useGetGeneralRequest = ({
  pagination,
  filter,
}: {
  pagination?: IPaginationProps;
  filter?: IGeneralRequestFilter;
} = {}) => {
  const { companyId, token } = useApiAuth();
  const { departmentId, employeeId, status } = filter ?? {};
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_GENERAL_SHIFT_SWAP_APPROVAL,
      pagination,
      departmentId,
      employeeId,
      status,
    ],
    () =>
      getEmployeePerShift({
        auth: { token, companyId },
        pagination,
        filter: { departmentId, employeeId, status },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
