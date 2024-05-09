import { useQuery } from "react-query";
import { ICurrentCompany, IPaginationProps, ISearchParams } from "types";
import { TRole } from "../types";
import axios from "axios";
import { MICROSERVICE_ENDPOINTS } from "config/enviroment";
import { DEFAULT_PAGE_SIZE } from "constants/general";
import { useApiAuth } from "hooks/useApiAuth";

export const QUERY_KEY_FOR_ROLES = "roles";

interface IGetRolesProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
}
const getRoles = async (props: IGetRolesProps, auth: ICurrentCompany) => {
  const { pagination } = props;
  const limit = pagination?.limit ?? DEFAULT_PAGE_SIZE;
  const offset = pagination?.offset ?? 0;

  let url = `${MICROSERVICE_ENDPOINTS.AUTHENTICATION}/permission/role`;

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

  const response = await axios.get(url, config);
  return response;
};

interface IFRQDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  onSuccess?: Function;
}
export interface IFRQRoleReturnProps {
  data: TRole[];
  total: number;
}
export const useFetchRoles = ({
  pagination,
  searchParams,
  onSuccess,
}: IFRQDataProps) => {
  const { companyId, token } = useApiAuth();
  const queryData = useQuery(
    [
      QUERY_KEY_FOR_ROLES,
      pagination?.limit,
      pagination?.offset,
      searchParams?.name,
    ],
    () =>
      getRoles(
        {
          pagination: { limit: pagination?.limit, offset: pagination?.offset },
          searchParams,
        },
        { companyId, token }
      ),
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
