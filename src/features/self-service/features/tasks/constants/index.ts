import { TTaskStatus } from "../types";

const TASK_STATUSES: TTaskStatus[] = ["active", "new", "closed", "resolved"];

export const TASK_STATUS_OPTIONS: { value: TTaskStatus; label: string }[] =
  TASK_STATUSES.map((item) => ({ label: item, value: item }));
