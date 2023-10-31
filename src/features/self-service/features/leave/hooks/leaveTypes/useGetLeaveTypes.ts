import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { TLeaveType } from "../../types";
import { useApiAuth } from "hooks/useApiAuth";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  isActive?: boolean;
}

export const QUERY_KEY_FOR_LEAVE_TYPES = "leave-types";

const getLeaveTypes = async (
  props: IGetDataProps,
  auth: ICurrentCompany
): Promise<{ data: TLeaveType[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${MICROSERVICE_ENDPOINTS.UTILITY}/self-service/leave/type`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      limit,
      offset,
      search: name,
      isActive: props.isActive,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TLeaveType[] = result.map(
    (item: TLeaveType): TLeaveType => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetLeaveTypes = (props: IGetDataProps = {}) => {
  const { pagination, searchParams } = props;
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [QUERY_KEY_FOR_LEAVE_TYPES, pagination, searchParams],
    () =>
      getLeaveTypes(
        {
          ...props,
        },
        {
          token,
          companyId,
        }
      ),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
