import { ICurrentCompany, TFetchListDataProps } from "types";

export interface IFRQSingleGroupMembersDataProps extends TFetchListDataProps {
  id: number;
  onSuccess?: Function;
}

export interface IGetSingleGroupMembersProps
  extends IGetSingleGroupProps,
    TFetchListDataProps {}

export interface IAddMemberToGroupProps extends IGetSingleGroupProps {
  employeeId: number;
  isLead?: boolean;
}

export interface IUpdateMemberToGroupProps extends IAddMemberToGroupProps {
  managementId: number;
  isLead?: boolean;
}

export type TGroup = {
  id?: number;
  name: string;
  description: string;
  email: string;
  employees?: TGroupMember[];
};

export type TGroupMember = {
  id: number;
  employeeId: number;
  isLead?: boolean;
  firstName?: string;
  lastName?: string;
  empUid?: string;
  email: string;
  avatarUrl?: string;
};

export interface ISaveDataProps extends ICurrentCompany, TGroup {}

export interface IGetSingleGroupProps extends ICurrentCompany {
  id: number;
}
