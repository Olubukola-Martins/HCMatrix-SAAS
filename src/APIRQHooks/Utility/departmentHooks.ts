import { Spin } from "antd";
import pagination from "antd/lib/pagination";
import { useSignOut } from "react-auth-kit";
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
  token: string;
}
export interface IFRQDepartmentsReturnProps {
  data: TDepartment[];
  total: number;
}

export const useFetchDepartments = ({
  pagination,
  companyId,
  onSuccess,
  token,
}: IFRQDepartmentsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["departments", pagination?.current, pagination?.limit],
    () =>
      getDepartments({
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
