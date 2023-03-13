import {
  getGroups,
  IGetSingleGroupProps,
  getSingleGroup,
  saveGroup,
  deleteSingleGroup,
  getSingleGroupMembers,
  removeMemberFromGroup,
  updateMemberInGroup,
  addMemberToGroup,
} from "ApiRequesHelpers/Utility/groups";
import { IGetDataProps, TGroup, TGroupMember } from "AppTypes/DataEntitities";
import { useSignOut } from "react-auth-kit";
import { useQuery, useMutation } from "react-query";

interface IFRQDataProps extends IGetDataProps {
  companyId: string;
  onSuccess?: Function;
  token: string;
}
export interface IFRQDataReturnProps {
  data: TGroup[];
  total: number;
}
export interface IFRQSingleGroupMembersDataReturnProps {
  data: TGroupMember[];
  total: number;
}

interface IFRQSingleGroupMembersDataProps extends IFRQDataProps {
  id: number;
}
export const useFetchSingleGroupMembers = ({
  pagination,
  companyId,
  onSuccess,
  token,
  searchParams,
  id,
}: IFRQSingleGroupMembersDataProps) => {
  const queryData = useQuery(
    [
      "single-group-members",
      id,
      pagination?.current,
      pagination?.limit,
      searchParams?.name,
    ],
    () =>
      getSingleGroupMembers({
        companyId,
        pagination: { limit: pagination?.limit, offset: pagination?.offset },
        searchParams: { name: searchParams?.name },
        token,
        id,
      }),
    {
      onSuccess: (data) => {
        onSuccess && onSuccess(data);
      },
    }
  );

  return queryData;
};
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
export const useRemoveMemberFromGroup = () => {
  return useMutation(removeMemberFromGroup);
};
export const useUpdateMemberInGroup = () => {
  return useMutation(updateMemberInGroup);
};
export const useAddMemberToGroup = () => {
  return useMutation(addMemberToGroup);
};
