export type TGroup = {
  id: number;
  name: string;
  description: string;
  email: string;
  employees?: TGroupMember[];
};

export type TGroupMember = {
  id: number;
  employeeId: number;
  isLead?: boolean;
  firstName: string;
  lastName: string;
  empUid: string;
  email: string;
  avatarUrl?: string;
};
