import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TDelegation } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { DEFAULT_PAGE_SIZE } from "constants/general";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const QUERY_KEY_FOR_DELEGATED_DELEGATIONS = "delegated-delegations";

const getDelegations = async (vals: {
  props: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TDelegation[]; total: number }> => {
  const { props, auth } = vals;
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/delegation/delegatee`;

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

  const data: TDelegation[] = result.map(
    (item: TDelegation): TDelegation => ({ ...item })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useGetAllDelegatedDelegations = (props: IGetDataProps) => {
  const { token, companyId } = useApiAuth();

  const { pagination, searchParams } = props;
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_DELEGATED_DELEGATIONS,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getDelegations({
        auth: {
          token,
          companyId,
        },
        props,
      }),
    {
      onError: (err: any) => {},
      onSuccess: (data) => {},
    }
  );

  return queryData;
};
