import { TPermissionLabel } from "features/core/roles-and-permissions/types";

export type TAuthUser = {
  user: User;
  payload: Payload[];
};

interface Payload {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  hasSelfService: boolean;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl?: string;
  company: Company;
  role: Role;
  delegation?: Delegation;
}

interface Delegation {
  id: number;
  delegatorId: number;
  delegateeId: number;
  startDate: string;
  endDate: string;
  description: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  permissions: Permission3[];
}

interface Permission3 {
  id: number;
  permissionId: number;
  delegationId: number;
  createdAt: string;
  updatedAt: string;
  permission: Permission;
}

interface Role {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  permissions: Permission2[];
}

interface Permission2 {
  id: number;
  permissionId: number;
  roleId: number;
  createdAt: string;
  updatedAt: string;
  permission: Permission;
}

interface Permission {
  id: number;
  name: string;
  label: TPermissionLabel;
  categoryId: number;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Company {
  id: number;
  name: string;
  label: string;
  email: string;
  phoneNumber: string;
  isParent: boolean;
  isActive: boolean;
  color: string;
  industryId: number;
  userId: number;
  addressId: number;
  logoUrl: string;
  website: string;
  parentId?: number;
}

interface User {
  id: number;
  fullName: string;
  email: string;
  isOwner: boolean;
  isSocial: boolean;
  isVerified: boolean;
  lastLogin: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}
