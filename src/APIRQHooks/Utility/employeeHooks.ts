import { ISearchParams } from "AppTypes/Search";
import moment from "moment";
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
  employeeInvite,
  getEmployees,
  getInvitedEmployees,
  getSingleEmployee,
  IGetSingleEmpProps,
  resendEmployeeInvite,
  saveEmployeeEducationDetail,
  saveEmployeeEmployementHistory,
  saveEmployeeSkill,
  updateDependantOfEmployee,
  updateEmployee,
  updateEmployeeJobInfo,
  updateEmployeePersonalInfo,
} from "../../ApiRequesHelpers/Utility/employee";
import {
  TBank,
  TEducationDetail,
  TEmployee,
  TEmployeeDependant,
  TEmployeeStatus,
  TEmployementHistory,
  TInvitedEmployee,
  TPension,
  TSkill,
  TWallet,
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
      // enabled: employeeId === 0 ? false : true,
      onError: (err: any) => {
        signOut();
        localStorage.clear();
      },

      select: (res: any) => {
        const item = res.data.data as TEmployee;
        const fetchedData = res.data.data;
        const wallet = fetchedData?.finance?.find(
          (item: any) => item.key === "wallet"
        )?.value as TWallet;
        const bank = fetchedData?.finance?.find(
          (item: any) => item.key === "bank"
        )?.value as TBank;
        const pension = fetchedData?.finance?.find(
          (item: any) => item.key === "pension"
        )?.value as TPension;
        const skills = fetchedData?.skills?.map(
          (item: any): TSkill => ({
            competency: item.competency,
            skill: item.skill,
            id: item.id,
          })
        );
        const employmentHistory = fetchedData?.employmentHistory?.map(
          (item: any): TEmployementHistory => ({
            organization: item.organization,
            startDate: item.startDate,
            endDate: item.endDate,
            id: item.id,
            position: item.position,
          })
        );
        const educationDetails = fetchedData?.educationDetails?.map(
          (item: any): TEducationDetail => ({
            specialization: item.specialization,
            startDate: item.startDate,
            endDate: item.endDate,
            id: item.id,
            degree: item.degree,
            school: item.school,
          })
        );
        const dependents = fetchedData?.dependents?.map(
          (item: any): TEmployeeDependant => ({
            id: item.id,
            fullName: item.fullName,
            dob: item.dob,
            relationship: item.relationship,
            phoneNumber: item.phoneNumber,
          })
        );

        // const item = fetchedData.result;
        // TO DO -> update employee type and populate with neccessary data
        // TO DO -> default image to be shown 4 user -> use first letter url (laravel)
        // To Do -> updating employee info

        const data: TEmployee = {
          ...item,
          companyId: item.companyId,
          avatarUrl: item.avatarUrl,

          createdAt: item.createdAt,
          deletedAt: item.deletedAt,
          designation: item.designation, //adhered to backend
          designationId: item.designationId,
          email: item.email,
          empUid: item.empUid,
          firstName: item.firstName,
          hasSelfService: item.hasSelfService,
          id: item.id,
          jobInformation: item.jobInformation,
          lastName: item.lastName,
          personalInformation: item.personalInformation,
          role: item.role,
          roleId: item.roleId,
          status: item.status,
          updatedAt: item.updatedAt,
          userId: item.userId,
          // --------------
          finance: {
            wallet,
            bank,
            pension,
          },
          skills,
          employmentHistory,
          educationDetails,
          dependents,

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
