import pagination from "antd/lib/pagination";
import { useQuery } from "react-query";
import { getRoles } from "../../ApiRequesHelpers/Auth/permissions";
import { TRole } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDataProps {
  pagination?: IPaginationProps;
  companyId: string;
  onSuccess?: Function;
}
export interface IFRQRoleReturnProps {
  data: TRole[];
  total: number;
}
export const useFetchRoles = ({
  pagination,
  companyId,
  onSuccess,
}: IFRQDataProps) => {
  const queryData = useQuery(
    ["roles", pagination?.current],
    () =>
      getRoles({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
      }),
    {
      // refetchInterval: false,
      // refetchIntervalInBackground: false,
      // refetchOnWindowFocus: false,
      onError: (err: any) => {
        // show notification
        openNotification({
          state: "error",
          title: "Error Occured",
          description:
            err?.response.data.message ?? err?.response.data.error.message,
        });
      },
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
