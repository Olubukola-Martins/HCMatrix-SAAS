import axios from "axios";
import { useQuery } from "react-query";
import { IFRQDesignationsProps, IGetDegsProps, TDesignation } from "../types";
import { ICurrentCompany } from "types";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_DESIGNATIONS = "designations";

export const getDesignations = async (vals: {
  props: IGetDegsProps;
  auth: ICurrentCompany;
}): Promise<{ data: TDesignation[]; total: number }> => {
  const { props, auth } = vals;
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${auth.token}`,
      "x-company-id": auth.companyId,
    },
    params: {
      limit,
      offset,
      search: props?.searchParams?.name,
    },
  };

  const res = await axios.get(url, config);
  const fetchedData = res.data.data;
  const result = fetchedData.result;

  const data: TDesignation[] = result.map(
    (item: TDesignation): TDesignation => item
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchDesignations = ({
  pagination,
  searchParams,

  onSuccess,
}: IFRQDesignationsProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_DESIGNATIONS, pagination?.limit, searchParams?.name],
    () =>
      getDesignations({
        props: {
          pagination,
          searchParams,
        },
        auth: {
          companyId,
          token,
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
