import { Spin } from "antd";
import pagination from "antd/lib/pagination";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createDepartment,
  getDepartments,
  ICreateDepProps,
} from "../../ApiRequesHelpers/Utility/departments";
import { getEmployees } from "../../ApiRequesHelpers/Utility/employee";
import { TDepartment, TEmployee } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  companyId: string;
  onSuccess?: Function;
  token: string;
}
export interface IFRQEmpsReturnProps {
  data: TEmployee[];
  total: number;
}
export const useFetchEmployees = ({
  pagination,
  companyId,
  onSuccess,
  token,
}: IFRQDepartmentsProps) => {
  const queryData = useQuery(
    ["employees", pagination?.current, pagination?.limit],
    () =>
      getEmployees({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        token,
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
        const fetchedData = res.data.data;
        const result = fetchedData.result;

        const data: TEmployee[] = result.map(
          (item: any): TEmployee => ({
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            gender: item?.gender ?? "nil",
            employeeID: item?.empUid,
            designation: item.designation.name,
            department: item?.department?.name ?? "nil",
            status: item?.status ?? "nil",
            role: item?.role?.name,
            email: item?.email,
          })
        );

        const ans: IFRQEmpsReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};

export const useCreateDepartment = () => {
  return useMutation(createDepartment);
};
