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

const determineActionLabel = (val: TApprovalStatus) => {
  let label = "";
  switch (val) {
    case "rejected":
      label = "Reject";

      break;
    case "approved":
      label = "Approve";

      break;

    default:
      break;
  }
  return label;
};
export const APPROVAL_STATUS_ACTION_OPTIONS = APPROVAL_STATUS_OPTIONS.filter(
  (item) => item.value !== "pending"
).map((item) => ({ ...item, label: determineActionLabel(item.value) }));
