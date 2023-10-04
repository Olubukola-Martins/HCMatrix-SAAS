import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TDepartment } from "../types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_DEPARTMENTS = "departments";

interface IGetDepsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getDepartments = async (vals: {
  props: IGetDepsProps;
  auth: ICurrentCompany;
}): Promise<{ data: TDepartment[]; total: number }> => {
  const { auth, props } = vals;
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/department`;

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
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TDepartment[] = result.map(
    (item: TDepartment): TDepartment => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchDepartments = ({
  pagination,

  searchParams,
  onSuccess,
}: IGetDepsProps & {
  onSuccess?: Function;
}) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [
      QUERY_KEY_FOR_DEPARTMENTS,
      pagination?.offset,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getDepartments({
        auth: {
          token,
          companyId,
        },
        props: {
          pagination,
          searchParams,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {
        onSuccess?.(data);
      },
    }
  );

  return queryData;
};
