import { TApprovalRequest } from "features/core/workflows/types/approval-requests";
import { TWorkflowApprovalType } from "features/core/workflows/types";

export type TSelfServiceDBAnalytics = {
  analytics: Analytics;
  settings: Setting[];
};

interface Setting {
  type: TWorkflowApprovalType | "exit-handover-form";
  isActive: boolean;
}

interface Analytics {
  totalAssetCount: number;
  recentRequests: TApprovalRequest[];
}
export type TSelfServiceApplicationMode =
  | "apply-for-myself"
  | "apply-for-unlisenced-employee";
