import { TProjectStatus } from "../types";

export const PROJECT_STATUSES: TProjectStatus[] = [
  "pending",
  "active",
  "closed",
];

export const PROJECT_STATUS_OPTIONS = PROJECT_STATUSES.map((status) => ({
  label: status,
  value: status,
}));
