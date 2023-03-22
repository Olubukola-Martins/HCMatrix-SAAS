import pagination from "antd/lib/pagination";
import { ISearchParams } from "AppTypes/Search";
import { useSignOut } from "react-auth-kit";
import { useQuery } from "react-query";
import { getRoles } from "../../ApiRequesHelpers/Auth/permissions";
import { TRole } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDataProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

  companyId: string;
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
    ["roles", pagination?.current, pagination?.limit, searchParams?.name],
    () =>
      getRoles({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        searchParams: { name: searchParams?.name },

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

            userCount: item.userCount ?? 0,
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
