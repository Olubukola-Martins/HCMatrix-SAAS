export const something = "";

export type TStagingType = "employee" | "role" | "group" | "department-head";
export type TStageCondition = "specific" | "at-least-one" | "everyone";
export type TWorkflowType = "advanced" | "basic";
export type TStage = {
  id: number;
  name: string;
  type: TStagingType;
  entityId: number;
  condition?: TStageCondition;
  count?: number;
};

export interface TSingleWorkflow {
  id: number;
  name: string;
  label: string;
  type: TWorkflowType;
  lastModifiedById: number;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
  lastModifiedBy: LastModifiedBy;
  stages: Stage[];
}

interface Stage {
  id: number;
  workflowId: number;
  name: string;
  type: TStagingType;
  entityId: number;
  condition?: TStageCondition;
  count?: number;
  createdAt: string;
  updatedAt: string;
  role?: Role;
  employee?: Employee;
  group?: Group;
}

interface Group {
  id: number;
  name: string;
  label: string;
  description: string;
  email: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

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
  avatarUrl?: any;
  createdAt: string;
  updatedAt: string;
  deletedAt?: any;
}

interface Role {
  id: number;
  name: string;
  label: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  employeeCount: number;
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
