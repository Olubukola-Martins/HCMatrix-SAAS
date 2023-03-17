import { ISearchParams } from "AppTypes/Search";
import { useSignOut } from "react-auth-kit";

import { useMutation, useQuery } from "react-query";
import {
  addDependantToEmployee,
  createEmployee,
  createEmployeeBank,
  createEmployeeJobInfo,
  createEmployeePension,
  createEmployeePersonalInfo,
  createEmployeeWallet,
  deleteDependantOfEmployee,
  deleteEmployeeEducationDetail,
  deleteEmployeeEmploymentHistory,
  deleteEmployeeSkill,
  employeeBulkUpload,
  employeeInvite,
  getEmployees,
  getInvitedEmployees,
  getSingleEmployee,
  IGetSingleEmpProps,
  resendEmployeeInvite,
  saveEmployeeEducationDetail,
  saveEmployeeEmergencyContact,
  saveEmployeeEmployementHistory,
  saveEmployeeSkill,
  updateDependantOfEmployee,
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

interface IFRQResendInviteProps {
  companyId: string;
  onSuccess?: Function;
  token: string;
  id: number;
}
interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;

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
    }
  );

  return queryData;
};
export const useFetchEmployees = ({
  pagination,
  searchParams,
  companyId,
  onSuccess,
  token,
  status,
}: IFRQDepartmentsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    [
      "employees",
      pagination?.current,
      pagination?.limit,
      status,
      searchParams?.name,
    ],
    () =>
      getEmployees({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        searchParams: { name: searchParams?.name },

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
    }
  );

  return queryData;
};
export const useFetchSingleEmployee = ({
  employeeId,
  companyId,

  token,
}: IGetSingleEmpProps) => {
  const queryData = useQuery(
    ["single-employee", employeeId],
    () =>
      getSingleEmployee({
        companyId,
        token,
        employeeId,
      }),

    {
      // enabled: employeeId === 0 ? false : true,
      onError: (err: any) => {},
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
export const useCreateEmployeeWallet = () => {
  return useMutation(createEmployeeWallet);
};
export const useCreateEmployeeBank = () => {
  return useMutation(createEmployeeBank);
};
export const useCreateEmployeePension = () => {
  return useMutation(createEmployeePension);
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

export const useSaveEmployeeSkill = () => {
  return useMutation(saveEmployeeSkill);
};
export const useSaveEmployeeEducationDetail = () => {
  return useMutation(saveEmployeeEducationDetail);
};
export const useSaveEmployeeEmployementHistory = () => {
  return useMutation(saveEmployeeEmployementHistory);
};

export const useDeleteEmployeeSkill = () => {
  return useMutation(deleteEmployeeSkill);
};
export const useDeleteEmployeeEmploymentHistory = () => {
  return useMutation(deleteEmployeeEmploymentHistory);
};
export const useDeleteEmployeeEducationDetail = () => {
  return useMutation(deleteEmployeeEducationDetail);
};

// dependant
export const useDeleteDependantOfEmployee = () => {
  return useMutation(deleteDependantOfEmployee);
};
export const useUpdateDependantOfEmployee = () => {
  return useMutation(updateDependantOfEmployee);
};
export const useAddDependantToEmployee = () => {
  return useMutation(addDependantToEmployee);
};

// emergency contact

export const useSaveEmployeeEmergencyContact = () => {
  return useMutation(saveEmployeeEmergencyContact);
};
// employee bulk upload

export const useEmployeeBulkUpload = () => {
  return useMutation(employeeBulkUpload);
};
