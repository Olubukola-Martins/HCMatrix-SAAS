import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { IFRQEmpDataProps, TEmployeeStatus } from "../types";
import { TInvitedEmployee } from "../types";
import moment from "moment";
import axios from "axios";

export const QUERY_KEY_FOR_INVITED_EMPLOYEES = "invited-employees";

interface IGetEmpsProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
  status?: TEmployeeStatus[];
}
export const getInvitedEmployees = async (
  props: IGetEmpsProps
): Promise<{ data: TInvitedEmployee[]; total: number }> => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;
  const name = props.searchParams?.name ?? "";

  let url = `${process.env.REACT_APP_UTILITY_BASE_URL}/employee/invite`;

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

  const data: TInvitedEmployee[] = result.map(
    (item: any): TInvitedEmployee => ({
      id: item.id,
      lastSent: moment(item.updatedAt).format("YYYY-MM-DD"),

      email: item?.email,
    })
  );

  const ans = {
    data,
    total: fetchedData.totalCount,
  };

  return ans;
};

export const useFetchInvitedEmployees = ({
  pagination,
  companyId,
  onSuccess,
  token,
}: IFRQEmpDataProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [QUERY_KEY_FOR_INVITED_EMPLOYEES, pagination?.limit, pagination?.offset],
    () =>
      getInvitedEmployees({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
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
