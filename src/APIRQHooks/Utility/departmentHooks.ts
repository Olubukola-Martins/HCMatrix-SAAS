import pagination from "antd/lib/pagination";
import { useQuery } from "react-query";
import { getDepartments } from "../../ApiRequesHelpers/Utility/departments";
import { TDepartment } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  companyId: string;
}
interface IFRQDepartmentsReturnProps {
  data: TDepartment[];
  total: number;
}
export const useFetchDepartments = ({
  pagination,
  companyId,
}: IFRQDepartmentsProps) => {
  const queryData = useQuery(
    ["departments", pagination?.current],
    () =>
      getDepartments({
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
        const result = res.data.data;
        console.log("resultx", result);

        const data: TDepartment[] = result.map(
          (item: any): TDepartment => ({
            id: item.id,
            name: item.name,
            email: item.email,
            employeeCount: item.employeeCount ?? 0,
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
