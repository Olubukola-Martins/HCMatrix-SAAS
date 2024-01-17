import { TTaskStatus } from "../types";

const TASK_ASSIGNER_TASK_STATUSES: TTaskStatus[] = ["new", "closed"];
const TASK_ASSIGNEE_TASK_STATUSES: TTaskStatus[] = ["active", "resolved"];

export const TASK_ASSIGNER_TASK_STATUS_OPTIONS: {
  value: TTaskStatus;
  label: string;
}[] = TASK_ASSIGNER_TASK_STATUSES.map((item) => ({ label: item, value: item }));

export const TASK_ASSIGNEE_TASK_STATUS_OPTIONS: {
  value: TTaskStatus;
  label: string;
}[] = TASK_ASSIGNEE_TASK_STATUSES.map((item) => ({ label: item, value: item }));
export const TASK_STATUS_OPTIONS: {
  value: TTaskStatus;
  label: string;
}[] = [
  ...TASK_ASSIGNER_TASK_STATUS_OPTIONS,
  ...TASK_ASSIGNEE_TASK_STATUS_OPTIONS,
];
