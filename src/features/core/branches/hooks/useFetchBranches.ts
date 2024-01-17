import axios from "axios";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TBranch } from "../types";
import { useQuery } from "react-query";
import { useApiAuth } from "hooks/useApiAuth";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_BRANCHES = "branches";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const getBranches = async (vals: {
  auth: ICurrentCompany;
  props: IGetDataProps;
}): Promise<{ data: TBranch[]; total: number }> => {
  const { auth, props } = vals;
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch`;

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

  const data: TBranch[] = result.map((item: TBranch): TBranch => item);

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchBranches = ({
  pagination,

  searchParams,
}: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [
      QUERY_KEY_FOR_BRANCHES,
      pagination?.offset,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getBranches({
        auth: {
          companyId,
          token,
        },

        props: {
          pagination,
          searchParams,
        },
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
