export type TTaskComment = {
  id: number;
  taskId: number;
  commenterId: number;
  comment: string;
  companyId: number;
  createdAt: string;
  updatedAt: string;
  commenter: Commenter;
};

interface Commenter {
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
  deletedAt?: string;
}
