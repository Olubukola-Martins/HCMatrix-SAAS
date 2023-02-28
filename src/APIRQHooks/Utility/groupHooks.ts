import {
  deleteSingleGroup,
  getGroups,
  getSingleGroup,
  IGetSingleGroupProps,
  saveGroup,
} from "ApiRequesHelpers/Utility/groups";
import { ISearchParams } from "AppTypes/Search";
import { useSignOut } from "react-auth-kit";
import { useMutation, useQuery } from "react-query";
import {
  getDepartments,
  getSingleDepartment,
} from "../../ApiRequesHelpers/Utility/departments";
import {
  IGetDataProps,
  TDepartment,
  TGroup,
  TGroupMember,
} from "../../AppTypes/DataEntitities";

interface IFRQDataProps extends IGetDataProps {
  companyId: string;
  onSuccess?: Function;
  token: string;
}
export interface IFRQDataReturnProps {
  data: TGroup[];
  total: number;
}

export const useFetchGroups = ({
  pagination,
  companyId,
  onSuccess,
  token,
  searchParams,
}: IFRQDataProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["groups", pagination?.current, pagination?.limit, searchParams?.name],
    () =>
      getGroups({
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

      select: (res: any) => {
        const fetchedData = res.data.data;
        const result = fetchedData.result;

        const data: TGroup[] = result.map(
          (item: any): TGroup => ({
            id: item.id,
            name: item.name,
            email: item.email,
            description: item.description,
            employees: item?.employees?.map(
              (item: any): TGroupMember => ({
                id: item.id,
                firstName: item.employee.firstName,
                isLead: item.isLead,
                lastName: item.employee.lastName,
                employeeId: item.employeeId,
                empUid: item.empUid,
                email: item.employee.email,
              })
            ),
          })
        );

        const ans: IFRQDataReturnProps = {
          data,
          total: fetchedData.totalCount,
        };

        return ans;
      },
    }
  );

  return queryData;
};
export const useFetchSingleGroup = ({
  id,
  companyId,

  token,
}: IGetSingleGroupProps) => {
  const signOut = useSignOut();

  const queryData = useQuery(
    ["single-group", id],
    () =>
      getSingleGroup({
        companyId,
        id,

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

      select: (res: any) => {
        const item = res.data.data;

        const data: TGroup = {
          id: item.id,
          name: item.name,
          email: item.email,
          description: item.description,
          employees: item?.employees.map(
            (item: any): TGroupMember => ({
              id: item.id,

              firstName: item.employee.firstName,
              isLead: item.isLead,
              lastName: item.employee.lastName,
              employeeId: item.employeeId,
              empUid: item.empUid,
              email: item.employee.email,
            })
          ),
        };
        return data;
      },
    }
  );

  return queryData;
};

export const useSaveGroup = () => {
  return useMutation(saveGroup);
};
export const useDeleteGroup = () => {
  return useMutation(deleteSingleGroup);
};
