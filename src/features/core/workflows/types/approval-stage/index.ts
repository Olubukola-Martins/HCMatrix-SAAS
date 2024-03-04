import { TApprovalStatus } from "types/statuses";
import { TWorkflowType } from "..";

export type TApprovalStage = {
  id: number;
  workflowId: number;
  name: string;
  type: string;
  entityId: number;
  enableTwoFactorAuth: boolean;
  condition?: string;
  count?: number;
  createdAt: string;
  updatedAt: string;
  workflow: Workflow;
  approvals: Approval[];
  role?: Role;
  status: TApprovalStatus;
  group?: Group;
};

interface Group {
  id: number;
  name: string;
  label: string;
  description?: string | null;
  email: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
}

interface Role {
  id: number;
  name: string;
  label: string;
  companyId: number;
}

interface Approval {
  id: number;
  advancedStageId: number;
  entityType: string;
  entityId: number;
  status: string;
  processed: boolean;
  approverId: number;
  comment?: string | null;
  createdAt: string;
  updatedAt: string;
  approver: Approver;
}

interface Approver {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isOwner: boolean;
  licenseType: string;
  empUid: string;
  roleId: number;
  status: string;
  companyId: number;
  designationId: number;
  userId: number;
  avatarUrl: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

interface Workflow {
  id: number;
  type: TWorkflowType;
}
