import axios from "axios";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TGroup, TGroupMember } from "../types";
import { useApiAuth } from "hooks/useApiAuth";
import { DEFAULT_PAGE_SIZE } from "constants/general";

export const QUERY_KEY_FOR_GROUPS = "groups";

interface IGetDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getGroups = async (vals: {
  props: IGetDataProps;
  auth: ICurrentCompany;
}): Promise<{ data: TGroup[]; total: number }> => {
  const { props, auth } = vals;
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group`;

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

  const data: TGroup[] = result.map(
    (item: any): TGroup => ({
      id: item.id,
      name: item.name,
      email: item.email,
      description: item.description,
      employees: item?.employees?.map(
        (item: any): TGroupMember => ({
          id: item.id,
          firstName: item.employee.firstName,
          isLead: item.isLead,
          lastName: item.employee.lastName,
          employeeId: item.employeeId,
          empUid: item.empUid,
          email: item.employee.email,
        })
      ),
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};
interface IFRQDataProps extends IGetDataProps {
  onSuccess?: Function;
}

export interface IFRQDataReturnProps {
  data: TGroup[];
  total: number;
}

export const useFetchGroups = ({
  pagination,
  onSuccess,
  searchParams,
}: IFRQDataProps) => {
  const { token, companyId } = useApiAuth();

  const queryData = useQuery(
    [QUERY_KEY_FOR_GROUPS, pagination?.limit, searchParams?.name],
    () =>
      getGroups({
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
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
