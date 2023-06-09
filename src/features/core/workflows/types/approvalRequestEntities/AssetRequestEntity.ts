export type AssetRequestEntity = {
  id: number;
  date: string;
  employeeId: number;
  assetId: number;
  description: string;
  attachmentUrls: any[];
  status: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  asset: Asset;
  employee: Employee;
};

interface Employee {
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
  imageUrl?: any;
  uid?: any;
  serialNumber?: any;
  brand?: any;
  model?: any;
  cost?: any;
  vendor?: any;
  purchaseDate?: any;
  color?: any;
  description?: any;
  assigneeId?: any;
  dateAssigned?: any;
  documentUrls: any[];
  companyId: number;
  createdAt: string;
  updatedAt: string;
}
