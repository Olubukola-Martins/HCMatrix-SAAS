import { TApprovalStatus } from "types/statuses";
import { TWorkflowApprovalType, TWorkflowType } from "..";
import { TLeaveRelieveApprovalStage } from "features/self-service/features/leave/hooks/leaveRelieverApproval/stage/useGetLeaveRelieveApprovalStage";

export type TApprovalStage = {
  id: number;
  workflowId?: number;
  name: string;
  type: TWorkflowApprovalType | "leave-relieve"; //this does not exist on api, done to ensure consistency, for the exception that is leave-relieve
  entityId: number;
  enableTwoFactorAuth: boolean;
  condition?: string;
  count?: number;
  createdAt: string;
  updatedAt: string;
  workflow?: Workflow | null;
  approvals: Approval[];
  status: TApprovalStatus;
  role?: Role;
  group?: Group;
  leaveReliever?: TLeaveRelieveApprovalStage["leave"]["reliever"]; //this does not exist by default(from api), but is added so the user can see th leave reliver when the type is a leave type(please refer to useGetApprovalStages for more info)
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
