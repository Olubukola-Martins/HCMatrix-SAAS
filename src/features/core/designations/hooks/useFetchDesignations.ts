import axios from "axios";
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { IFRQDesignationsProps, IGetDegsProps, TDesignation } from "../types";

export const QUERY_KEY_FOR_DESIGNATIONS = "designations";

export const getDesignations = async (
  props: IGetDegsProps
): Promise<{ data: TDesignation[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/designation`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
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
    (item: any): TDesignation => ({
      id: item.id,
      name: item.name,
      department: {
        id: item.department.id ?? "",
        name: item.department.name ?? "",
      },
      employeeCount: item.employeeCount ?? 0,
    })
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

  companyId,
  onSuccess,
  token,
}: IFRQDesignationsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [QUERY_KEY_FOR_DESIGNATIONS, pagination?.limit, searchParams?.name],
    () =>
      getDesignations({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        searchParams,

        token,
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        signOut();
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
