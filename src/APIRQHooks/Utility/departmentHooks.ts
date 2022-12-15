import { Spin } from "antd";
import pagination from "antd/lib/pagination";
import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  createDepartment,
  getDepartments,
  ICreateDepProps,
} from "../../ApiRequesHelpers/Utility/departments";
import { TDepartment } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  companyId: string;
  onSuccess?: Function;
}
export interface IFRQDepartmentsReturnProps {
  data: TDepartment[];
  total: number;
}

export const useFetchDepartments = ({
  pagination,
  companyId,
  onSuccess,
}: IFRQDepartmentsProps) => {
  const queryData = useQuery(
    ["departments", pagination?.current, pagination?.limit],
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
          title: "Error Occurred",
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
