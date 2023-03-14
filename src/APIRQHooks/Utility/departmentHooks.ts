import { ISearchParams } from "AppTypes/Search";
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  createDepartment,
  getDepartments,
  getSingleDepartment,
  IGetSingleDeptProps,
  updateDepartment,
} from "../../ApiRequesHelpers/Utility/departments";
import { TDepartment } from "../../AppTypes/DataEntitities";
import { IPaginationProps } from "../../AppTypes/Pagination";

interface IFRQDepartmentsProps {
  pagination?: IPaginationProps;
  searchParams?: ISearchParams;
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
  searchParams,
}: IFRQDepartmentsProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["departments", pagination?.current, pagination?.limit, searchParams?.name],
    () =>
      getDepartments({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        searchParams: { name: searchParams?.name },
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
export const useFetchSingleDepartment = ({
  departmentId,
  companyId,

  token,
}: IGetSingleDeptProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["single-department", departmentId],
    () =>
      getSingleDepartment({
        companyId,
        departmentId,

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
    }
  );

  return queryData;
};

export const useCreateDepartment = () => {
  return useMutation(createDepartment);
};
export const useUpdateDepartment = () => {
  return useMutation(updateDepartment);
};
