import axios from "axios";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TBranch } from "../types";
import { useQuery } from "react-query";

export const QUERY_KEY_FOR_BRANCHES = "branches";

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}

export const getBranches = async (
  props: IGetDataProps
): Promise<{ data: TBranch[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  const url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/branch`;

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
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

  const data: TBranch[] = result.map(
    (item: any): TBranch => ({
      id: item.id,
      name: item.name,
      description: item.description,
      address: {
        streetAddress: item.address.streetAddress,
        countryId: item.address.countryId,
        stateId: item.address.stateId,
        lgaId: item.address.lgaId,
        timezone: item.address.timezone,
      },
      employeeCount: item?.employeeCount,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

interface IFRQDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  companyId: number;
  onSuccess?: Function;
  token: string;
}

export const useFetchBranches = ({
  pagination,
  companyId,
  onSuccess,
  token,
  searchParams,
}: IFRQDataProps) => {
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_BRANCHES,
      pagination?.offset,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getBranches({
        companyId,
        pagination,
        searchParams,
        token,
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
