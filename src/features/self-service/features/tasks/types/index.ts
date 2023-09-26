export type TTaskPriority = "low" | "medium" | "high";
export type TTaskStatus = "active" | "new" | "resolved" | "closed";
export type TTask = {
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
