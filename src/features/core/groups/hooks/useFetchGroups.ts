import axios from "axios";
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TGroup, TGroupMember } from "../types";

export const QUERY_KEY_FOR_GROUPS = "groups";

interface IGetDataProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
export const getGroups = async (
  props: IGetDataProps
): Promise<{ data: TGroup[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/company/group?limit=${limit}&offset=${offset}`;
  if (props.searchParams?.name) {
    url += `&search=${props.searchParams.name}`;
  }

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${props.token}`,
      "x-company-id": props.companyId,
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
  companyId: number;
  onSuccess?: Function;
  token: string;
}

export interface IFRQDataReturnProps {
  data: TGroup[];
  total: number;
}

export const useFetchGroups = ({
  pagination,
  companyId,
  onSuccess,
  token,
  searchParams,
}: IFRQDataProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [QUERY_KEY_FOR_GROUPS, pagination?.limit, searchParams?.name],
    () =>
      getGroups({
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
