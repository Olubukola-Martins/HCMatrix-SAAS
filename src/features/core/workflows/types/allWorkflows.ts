export interface TAllWorkflow {
  id: number;
  name: string;
  label: string;
  type: string;
  lastModifiedById: number;
  numberOfStages: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  lastModifiedBy: LastModifiedBy;
}

interface LastModifiedBy {
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
