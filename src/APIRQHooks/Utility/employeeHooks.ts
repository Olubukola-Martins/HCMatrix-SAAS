import moment from "moment";
import { useSignOut } from "react-auth-kit";

import { useMutation, useQuery } from "react-query";
import {
  createEmployee,
  createEmployeeJobInfo,
  createEmployeePersonalInfo,
  employeeInvite,
  getEmployees,
  getInvitedEmployees,
  getSingleEmployee,
  IGetSingleEmpProps,
  resendEmployeeInvite,
  updateEmployee,
  updateEmployeeJobInfo,
  updateEmployeePersonalInfo,
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
          (item: TEmployee): TEmployee => ({
            ...item,
            // No need as we adhere to same type as backend
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
export const useFetchSingleEmployee = ({
  employeeId,
  companyId,

  token,
}: IGetSingleEmpProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["single-employee", employeeId],
    () =>
      getSingleEmployee({
        companyId,
        token,
        employeeId,
      }),

    {
      enabled: employeeId === 0 ? false : true,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },

      select: (res: any) => {
        const item = res.data.data as TEmployee;
        // const item = fetchedData.result;
        // TO DO -> update employee type and populate with neccessary data
        // TO DO -> default image to be shown 4 user -> use first letter url (laravel)
        // To Do -> updating employee info

        const data: TEmployee = {
          ...item,

          // no need to breakdown as we adhere to Backend Schema sent from respone
        };

        return data;
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

export const useCreateEmployee = () => {
  return useMutation(createEmployee);
};
export const useUpdateEmployee = () => {
  return useMutation(updateEmployee);
};
export const useCreateEmployeePersonalInfo = () => {
  return useMutation(createEmployeePersonalInfo);
};
export const useUpdateEmployeePersonalInfo = () => {
  return useMutation(updateEmployeePersonalInfo);
};
export const useCreateEmployeeJobInfo = () => {
  return useMutation(createEmployeeJobInfo);
};
export const useUpdateEmployeeJobInfo = () => {
  return useMutation(updateEmployeeJobInfo);
};

export const useInviteEmployees = () => {
  return useMutation(employeeInvite);
};
