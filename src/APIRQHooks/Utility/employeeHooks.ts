import { Spin } from "antd";
import moment from "moment";
import { useSignOut } from "react-auth-kit";

import { useMutation, useQuery } from "react-query";
import { createDepartment } from "../../ApiRequesHelpers/Utility/departments";
import {
  getEmployees,
  getInvitedEmployees,
  resendEmployeeInvite,
} from "../../ApiRequesHelpers/Utility/employee";
import {
  TEmployee,
  TEmployeeStatus,
  TInvitedEmployee,
} from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";
import { openNotification } from "../../NotificationHelpers";

interface IFRQResendInviteProps {
  companyId: string;
  onSuccess?: Function;
  token: string;
  id: number;
}
interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  companyId: string;
  status?: TEmployeeStatus[];
  onSuccess?: Function;
  token: string;
}
export interface IFRQInvEmpsReturnProps {
  data: TInvitedEmployee[];
  total: number;
}
export interface IFRQEmpsReturnProps {
  data: TEmployee[];
  total: number;
}
export const useFetchInvitedEmployees = ({
  pagination,
  companyId,
  onSuccess,
  token,
}: IFRQDepartmentsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["invited-employees", pagination?.current, pagination?.limit],
    () =>
      getInvitedEmployees({
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

        const data: TInvitedEmployee[] = result.map(
          (item: any): TInvitedEmployee => ({
            id: item.id,
            lastSent: moment(item.updatedAt).format("YYYY-MM-DD"),

            email: item?.email,
          })
        );

        const ans: IFRQInvEmpsReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};
export const useFetchEmployees = ({
  pagination,
  companyId,
  onSuccess,
  token,
  status,
}: IFRQDepartmentsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["employees", pagination?.current, pagination?.limit, status],
    () =>
      getEmployees({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        token,
        status,
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

        const data: TEmployee[] = result.map(
          (item: any): TEmployee => ({
            id: item.id,
            name: `${item.firstName} ${item.lastName}`,
            gender: item?.gender ?? "nil",
            employeeID: item?.empUid,
            designation: item?.designation?.name,
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

export const useResendEmployeeInvite = ({
  id,
  companyId,
  token,
  onSuccess,
}: IFRQResendInviteProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["resend-invite", id],
    () =>
      resendEmployeeInvite({
        companyId,
        id,
        token,
      }),
    {
      enabled: id === 0 ? false : true,
      refetchInterval: false,
      refetchIntervalInBackground: false,
      refetchOnWindowFocus: false,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
