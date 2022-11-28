import pagination from "antd/lib/pagination";
import { useQuery } from "react-query";
import { getPermissions } from "../../ApiRequesHelpers/Auth/permissions";
import { TPermission } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  companyId: string;
}
interface IFRQDepartmentsReturnProps {
  data: TPermission[];
  total: number;
}
export const useFetchPermissions = ({
  pagination,
  companyId,
}: IFRQDepartmentsProps) => {
  const queryData = useQuery(
    ["permissions", pagination?.current],
    () =>
      getPermissions({
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

      select: (res: any) => {
        // for all for now
        const result = res.data.data[0].permissions;
        console.log("resultx", result);

        const data: TPermission[] = result.map(
          (item: any): TPermission => ({
            id: item.id,
            name: item.name,
            label: item.label,
            categoryId: item.categoryId,
            description: item?.description,
          })
        );
        const ans: IFRQDepartmentsReturnProps = {
          data,
          total: res?.data?.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};
