import { TLicenseType } from "features/authentication/types/auth-user";

export type TAssetAssigneeHistory = {
  id: number;
  assetId: number;
  assigneeId: number;
  dateAssigned: string;
  dateReturned: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  asset: Asset;
  assignee: Assignee;
};

interface Assignee {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  licenseType: TLicenseType;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface Asset {
  id: number;
  name: string;
  typeId: number;
  status: string;
  imageUrl: string;
  uid: string;
  serialNumber: string;
  brand: string;
  model: string;
  cost: string;
  vendor: string;
  purchaseDate: string;
  color: string;
  description: string;
  assigneeId: number;
  dateAssigned: string;
  documentUrls?: any;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  type: Type;
}

interface Type {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
