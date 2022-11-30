import pagination from "antd/lib/pagination";
import { useQuery } from "react-query";
import { getPermissions } from "../../ApiRequesHelpers/Auth/permissions";
import { TPermission } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDepartmentsProps {
  companyId: string;
}

interface ICategory {
  id: number;
  name: string;
}

interface IFRQDepartmentsReturnProps {
  permissions: TPermission[];
  categories: ICategory[];
}
export const useFetchPermissions = ({ companyId }: IFRQDepartmentsProps) => {
  const queryData = useQuery(
    ["permissions"],
    () =>
      getPermissions({
        companyId,
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
        const result = res.data.data;

        const categories: ICategory[] = [];
        const permissions: TPermission[] = [];

        result.forEach((category: any) => {
          categories.push({ id: category.id, name: category.name });
          category.permissions.forEach((item: any) => {
            permissions.push({
              id: item.id,
              name: item.name,
              label: item.label,
              categoryId: item.categoryId,
              description: item?.description,
            });
          });
        });
        const ans: IFRQDepartmentsReturnProps = {
          permissions,
          categories: [
            {
              id: 0,
              name: "all",
            },
            ...categories,
          ],
        };

        return ans;
      },
    }
  );

  return queryData;
};
