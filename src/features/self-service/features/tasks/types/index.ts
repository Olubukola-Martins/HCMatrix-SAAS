import { TTaskComment } from "./comment";
type TTaskPriority = "low" | "medium" | "high";
type TTaskStatus = "active" | "new" | "resolved" | "closed";

type TTask = {
  id: number;
  name: string;
  description: string;
  assigneeId: number;
  assignedToId: number;
  status: TTaskStatus;
  priority: TTaskPriority;
  dateAssigned: string;
  dueDate: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  assignee: Assignee;
  assignedTo: Assignee;
};

export type { TTaskComment, TTaskPriority, TTaskStatus, TTask };

interface Assignee {
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
