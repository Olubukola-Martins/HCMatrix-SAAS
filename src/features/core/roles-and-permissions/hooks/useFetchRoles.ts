import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TRole } from "../types";
import axios from "axios";

export const QUERY_KEY_FOR_ROLES = "roles";

interface IGetRolesProps extends ICurrentCompany {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
const getRoles = async (props: IGetRolesProps) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? 10;
  const offset = pagination?.offset ?? 0;

  let url = `${process.env.REACT_APP_AUTHENTICATION_BASE_URL}/permission/role`;

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

  const response = await axios.get(url, config);
  return response;
};

interface IFRQDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  companyId: number;
  token: string;
  onSuccess?: Function;
}
export interface IFRQRoleReturnProps {
  data: TRole[];
  total: number;
}
export const useFetchRoles = ({
  pagination,
  searchParams,
  companyId,
  onSuccess,
  token,
}: IFRQDataProps) => {
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_ROLES,
      pagination?.limit,
      pagination?.offset,
      searchParams?.name,
    ],
    () =>
      getRoles({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
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

      select: (res: any) => {
        // for all for now
        const fetchedData = res.data.data;
        const result = fetchedData.result;

        const data: TRole[] = result.map(
          (item: any): TRole => ({
            id: item.id,
            name: item.name,
            label: item.label,

            userCount: item.employeeCount ?? 0,
            createdAt: item.createdAt,
            updatedAt: item.updatedAt,
          })
        );

        const ans: IFRQRoleReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};
