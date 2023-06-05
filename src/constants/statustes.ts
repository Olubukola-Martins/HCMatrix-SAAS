import { TApprovalStatus } from "types/statuses";

const APPROVAL_STATUSES: TApprovalStatus[] = [
  "pending",
  "rejected",
  "approved",
];

export const APPROVAL_STATUS_OPTIONS: {
  label: string;
  value: TApprovalStatus;
}[] = APPROVAL_STATUSES.map((item) => ({
  value: item,
  label: item,
}));
